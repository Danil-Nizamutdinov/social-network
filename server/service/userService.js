const { User } = require("../models/models");
const bcrypt = require("bcrypt");
const ApiError = require("../exceptions/apiError");
const tokenService = require("./tokenService");
const validator = require("validator");

const validateLoginPassword = (text) => {
  if (text.length < 4 || text.length > 14) {
    return false;
  }
  return validator.isAlphanumeric(text);
};

class UserService {
  async registration(login, password) {
    if (!validateLoginPassword(login)) {
      throw ApiError.BadRequest("Некорректный логин");
    }
    if (!validateLoginPassword(password)) {
      throw ApiError.BadRequest("Некорректный пароль");
    }
    const candidate = await User.findOne({ where: { login } });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${login} уже существует`
      );
    }
    const hashPassword = await bcrypt.hash(password, 4);
    const user = await User.create({
      avatar: "ava.png",
      login,
      password: hashPassword,
    });

    const tokens = tokenService.generateTokens({
      login: user.login,
      id: user.id,
    });

    await tokenService.saveToken(user.id, tokens.refreshToken);

    return {
      user: { id: user.id, login: user.login, avatar: user.avatar },
      ...tokens,
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
      user: { id: user.id, login: user.login, avatar: user.avatar },
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
      user: { id: user.id, login: user.login, avatar: user.avatar },
      ...tokens,
    };
  }
}

module.exports = new UserService();
