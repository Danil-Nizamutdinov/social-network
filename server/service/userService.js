const { User, TempUser, LoginAttempt } = require("../models/models");
const bcrypt = require("bcrypt");
const ApiError = require("../exceptions/apiError");
const tokenService = require("./tokenService");
const validator = require("validator");
const mailService = require("./mailService");

const CODE_EXPIRES_MINUTES = 15;
const RESEND_COOLDOWN_MINUTES = 3;
const BLOCK_DURATION_MINUTES = 30;
const MAX_ATTEMPTS = 5;

const validateLoginPassword = (text) => {
  if (text.length < 4 || text.length > 14) {
    return false;
  }
  return validator.isAlphanumeric(text);
};

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

class UserService {
  async registration(login, password, email) {
    this.validateRegistrationData(login, password, email);

    const existingUser = await this.checkExistingUser(login, email);

    if (existingUser) {
      throw ApiError.BadRequest("Пользователь с такими данными уже существует");
    }

    const candidateTempUser = await TempUser.findOne({ where: { email } });

    if (candidateTempUser) {
      return this.prepareTempUserResponse(candidateTempUser);
    }

    const tempUser = await this.createTempUser(login, password, email);

    await mailService.sendVerificationCode(email, tempUser.verificationCode);

    return this.prepareTempUserResponse(tempUser);
  }

  async verifyRegistration(tempUserId, code) {
    const tempUser = await TempUser.findByPk(tempUserId);

    if (!tempUser) {
      throw ApiError.BadRequest("ошибка tempUser");
    }

    const loginAttempt = await this.checkAndUpdateLoginAttempt(tempUser.email);

    const now = new Date();

    if (tempUser.verificationCode !== code) {
      loginAttempt.attemptCount += 1;
      loginAttempt.lastAttempt = now;

      if (loginAttempt.attemptCount >= MAX_ATTEMPTS) {
        loginAttempt.blockedUntil = new Date(
          Date.now() + BLOCK_DURATION_MINUTES * 60 * 1000
        );
      }

      await loginAttempt.save();

      throw ApiError.BadRequest("Неверный код подтверждения");
    }

    if (new Date() > tempUser.codeExpires) {
      throw ApiError.BadRequest("Код подтверждения истек");
    }

    const user = await User.create({
      avatar: "ava.png",
      login: tempUser.login,
      password: tempUser.password,
      email: tempUser.email,
    });

    await TempUser.destroy({ where: { id: tempUserId } });

    const tokens = tokenService.generateTokens({
      login: user.login,
      id: user.id,
    });

    await tokenService.saveToken(user.id, tokens.refreshToken);

    return {
      user: {
        id: user.id,
        login: user.login,
        avatar: user.avatar,
        email: user.email,
      },
      ...tokens,
    };
  }

  async resendVerificationCode(tempUserId) {
    const tempUser = await TempUser.findByPk(tempUserId);

    if (!tempUser) {
      throw ApiError.BadRequest("Ошибка tempUser");
    }

    await this.checkAndUpdateLoginAttempt(tempUser.email);

    const now = new Date();

    const currentCooldown = new Date(tempUser.resendCooldown);

    const isCooldownDateValid = !isNaN(currentCooldown.getTime());
    const isCooldownActive = now < currentCooldown;

    if (isCooldownDateValid && isCooldownActive) {
      throw ApiError.BadRequest("Повторная отправка кода временна ограничена");
    }

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const resendCooldown = new Date(
      Date.now() + RESEND_COOLDOWN_MINUTES * 60 * 1000
    );

    tempUser.resendCooldown = resendCooldown;
    tempUser.codeExpires = new Date(
      Date.now() + CODE_EXPIRES_MINUTES * 60 * 1000
    );
    tempUser.verificationCode = verificationCode;

    await tempUser.save();

    await mailService.sendVerificationCode(tempUser.email, verificationCode);

    return {
      tempUserId: tempUser.id,
      resendCooldown: tempUser.resendCooldown,
      message: "Код подтверждения отправлен на email",
    };
  }

  async checkAndUpdateLoginAttempt(email) {
    const now = new Date();
    const [loginAttempt] = await LoginAttempt.findOrCreate({
      where: { email },
      defaults: {
        attemptCount: 0,
        lastAttempt: now,
        blockedUntil: null,
      },
    });

    if (loginAttempt.blockedUntil && now > loginAttempt.blockedUntil) {
      loginAttempt.attemptCount = 0;
      loginAttempt.blockedUntil = null;
      await loginAttempt.save();
    }

    if (loginAttempt.blockedUntil && now <= loginAttempt.blockedUntil) {
      const minutesLeft = Math.ceil((loginAttempt.blockedUntil - now) / 60000);
      throw ApiError.BadRequest(
        `Аккаунт заблокирован. Попробуйте через ${minutesLeft} минут`
      );
    }

    return loginAttempt;
  }

  validateRegistrationData(login, password, email) {
    if (!validateLoginPassword(login)) {
      throw ApiError.BadRequest("Некорректный логин");
    }
    if (!validateLoginPassword(password)) {
      throw ApiError.BadRequest("Некорректный пароль");
    }
    if (!validateEmail(email)) {
      throw ApiError.BadRequest("Некорректный email");
    }
  }

  async checkExistingUser(login, email) {
    const [loginCandidate, emailCandidate] = await Promise.all([
      User.findOne({ where: { login } }),
      User.findOne({ where: { email } }),
    ]);

    return !!(loginCandidate || emailCandidate);
  }

  async createTempUser(login, password, email) {
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const codeExpires = new Date(Date.now() + CODE_EXPIRES_MINUTES * 60 * 1000);
    const resendCooldown = new Date(
      Date.now() + RESEND_COOLDOWN_MINUTES * 60 * 1000
    );

    const tempUser = await TempUser.create({
      login,
      password: await bcrypt.hash(password, 4),
      email,
      verificationCode,
      codeExpires,
      resendCooldown,
    });

    return tempUser;
  }

  prepareTempUserResponse(tempUser) {
    return {
      tempUserId: tempUser.id,
      resendCooldown: tempUser.resendCooldown,
      message: "Код подтверждения отправлен на email",
    };
  }

  async login(login, password) {
    const user = await User.findOne({ where: { login } });
    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким login не найден");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }
    const tokens = tokenService.generateTokens({
      login: user.login,
      id: user.id,
    });
    await tokenService.saveToken(user.id, tokens.refreshToken);

    return {
      user: {
        id: user.id,
        login: user.login,
        avatar: user.avatar,
        email: user.email,
      },
      ...tokens,
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }
  async refresh(refreshToken, res) {
    if (!refreshToken) {
      res.clearCookie("refreshToken");
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    if (!userData) {
      await tokenService.removeToken(refreshToken);
      res.clearCookie("refreshToken");
      throw ApiError.UnauthorizedError();
    }
    const tokenFromDb = await tokenService.findToken(userData.id);
    if (!tokenFromDb) {
      await tokenService.removeToken(refreshToken);
      res.clearCookie("refreshToken");
      throw ApiError.UnauthorizedError();
    }
    const user = await User.findOne({ where: { id: userData.id } });
    const tokens = tokenService.generateTokens({
      login: user.login,
      id: user.id,
    });
    await tokenService.saveToken(user.id, tokens.refreshToken);
    return {
      user: {
        id: user.id,
        login: user.login,
        avatar: user.avatar,
        email: user.email,
      },
      ...tokens,
    };
  }
}

module.exports = new UserService();
