const ApiError = require("../../exceptions/apiError");
const { Chat } = require("../../models/models");

module.exports = async function (socket, next) {
  try {
    const { chatId } = socket.handshake.query;

    if (!chatId) {
      return next(ApiError.UnauthorizedError());
    }
    const chat = await Chat.findByPk(chatId);

    if (!chat) {
      return next(ApiError.UnauthorizedError());
    }

    const isParticipant = [chat.user1Id, chat.user2Id].includes(socket.user.id);
    if (!isParticipant) {
      return next(ApiError.UnauthorizedError());
    }

    socket.chat = chat;

    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};
