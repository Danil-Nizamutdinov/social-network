const messageService = require("../service/messageService");
const socketAuthMiddleware = require("../middlewares/socketMiddleware/socketAuthMiddleware");
const socketChatAccessMiddleware = require("../middlewares/socketMiddleware/socketChatAccessMiddleware");

function initializeSocket(io) {
  io.use(socketAuthMiddleware);
  io.use(socketChatAccessMiddleware);

  io.on("connection", (socket) => {
    socket.on("join", async ({ login, chatId }) => {
      socket.join(chatId);
      const messages = await messageService.getMessages(chatId);
      socket.emit("getMessages", messages);
    });

    socket.on("sendMessage", async ({ userId, chatId, content }) => {
      const message = await messageService.addMessage(userId, chatId, content);
      const messages = await messageService.getMessages(chatId);
      io.to(chatId).emit("message", messages);
    });

    io.on("disconnect", () => {
      console.log("Disconnect");
    });
  });

  return io;
}

module.exports = initializeSocket;
