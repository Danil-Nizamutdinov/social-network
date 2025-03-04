const { Op } = require("sequelize");
const { User } = require("../models/models");
const userService = require("../service/userService");
const channelService = require("../service/channelService");

class UserController {
  async registration(req, res, next) {
    try {
      const { login, password } = req.body;
      const userData = await userService.registration(login, password);
      await channelService.createChannel(userData.user.id, login);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async login(req, res, next) {
    try {
      const { login, password } = req.body;
      const userData = await userService.login(login, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken, res);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
  async getUsers(req, res, next) {
    try {
      const { login } = req.query;

      const users = await User.findAll({
        where: {
          login: {
            [Op.iLike]: `%${login}%`,
          },
        },
        attributes: { exclude: ["password"] },
      });

      return res.json(users);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
