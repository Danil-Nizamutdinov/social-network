const { User, TempUser } = require("../models/models");
const bcrypt = require("bcrypt");
const ApiError = require("../exceptions/apiError");
const tokenService = require("./tokenService");
const validator = require("validator");
const mailService = require("./mailService");

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
    if (!validateLoginPassword(login)) {
      throw ApiError.BadRequest("Некорректный логин");
    }
    if (!validateLoginPassword(password)) {
      throw ApiError.BadRequest("Некорректный пароль");
    }
    if (!validateEmail(email)) {
      throw ApiError.BadRequest("Некорректный email");
    }

    const candidate = await User.findOne({ where: { login } });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с логином ${login} уже существует`
      );
    }

    const emailCandidate = await User.findOne({ where: { email } });
    if (emailCandidate) {
      throw ApiError.BadRequest(`Пользователь с email ${email} уже существует`);
    }

    const candidateTempUser = await TempUser.findOne({ where: { email } });

    if (candidateTempUser) {
      return {
        tempUserId: candidateTempUser.id,
        resendCooldown: candidateTempUser.resendCooldown,
        message: "Код подтверждения отправлен на email",
      };
    }

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const codeExpires = new Date(Date.now() + 15 * 60 * 1000);
    const resendCooldown = new Date(Date.now() + 3 * 60 * 1000);

    const tempUser = await TempUser.create({
      login,
      password: await bcrypt.hash(password, 4),
      email,
      verificationCode,
      codeExpires,
      resendCooldown,
    });

    await mailService.sendVerificationCode(email, verificationCode);

    return {
      tempUserId: tempUser.id,
      resendCooldown: tempUser.resendCooldown,
      message: "Код подтверждения отправлен на email",
    };
  }

  async verifyRegistration(tempUserId, code) {
    const tempUser = await TempUser.findByPk(tempUserId);

    if (!tempUser) {
      throw ApiError.BadRequest("Неверный код подтверждения");
    }

    if (tempUser.verificationCode !== code) {
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
      // isVerified: true,
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
      throw ApiError.BadRequest("Неверный код подтверждения");
    }

    const currentCooldown = new Date(tempUser.resendCooldown);
    const now = new Date();

    const isCooldownDateValid = !isNaN(currentCooldown.getTime());
    const isCooldownActive = now < currentCooldown;

    if (isCooldownDateValid && isCooldownActive) {
      throw ApiError.BadRequest("Повторная отправка кода временна ограничена");
    }

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const resendCooldown = new Date(Date.now() + 3 * 60 * 1000);

    tempUser.resendCooldown = resendCooldown;
    await tempUser.save();

    await mailService.sendVerificationCode(tempUser.email, verificationCode);

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
