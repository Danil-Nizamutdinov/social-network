const ApiError = require("../exceptions/apiError");
const { User } = require("../models/models");
const tokenService = require("../service/tokenService");

module.exports = function (options = {}) {
  const { checkUserId = false, checkChannelId = false } = options;
  return async function (req, res, next) {
    try {
      const authorizationHeader = req.headers.authorization;

      if (!authorizationHeader) {
        return next(ApiError.UnauthorizedError());
      }

      const accessToken = authorizationHeader.split(" ")[1];
      if (!accessToken) {
        return next(ApiError.UnauthorizedError());
      }

      const userData = tokenService.validateAccessToken(accessToken);

      if (!userData) {
        return next(ApiError.UnauthorizedError());
      }

      if (checkUserId) {
        const { userId } = req.body;

        if (userId !== userData.id) {
          return next(ApiError.BadRequest("Нет прав"));
        }
      }

      if (checkChannelId) {
        const { channelId } = req.body;
        const user = await User.findOne({ where: { id: channelId } });

        if (user.id !== userData.id) {
          return next(ApiError.BadRequest("Нет прав"));
        }
      }

      req.user = userData;
      next();
    } catch (e) {
      return next(ApiError.UnauthorizedError());
    }
  };
};
