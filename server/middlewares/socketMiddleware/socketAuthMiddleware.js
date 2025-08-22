const ApiError = require("../../exceptions/apiError");
const tokenService = require("../../service/tokenService");

module.exports = async function (socket, next) {
  try {
    const accessToken = socket.handshake.auth.token;

    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);

    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    socket.user = userData;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};
