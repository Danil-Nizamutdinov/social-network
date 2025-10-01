const messageService = require("../service/messageService");
const socketAuthMiddleware = require("../middlewares/socketMiddleware/socketAuthMiddleware");
const socketChatAccessMiddleware = require("../middlewares/socketMiddleware/socketChatAccessMiddleware");
const chatService = require("../service/chatService");
const { sseService } = require("../service/sseService");

function initializeSocket(io) {
  const chatNamespace = io.of("/chat");

  chatNamespace.use(socketAuthMiddleware);
  chatNamespace.use(socketChatAccessMiddleware);
  chatNamespace.on("connection", (socket) => {
    socket.on("join", async ({ login, chatId }) => {
      socket.join(chatId);
      const messages = await messageService.getMessages(chatId);
      socket.emit("getMessages", messages);
    });

    socket.on("sendMessage", async ({ userId, chatId, content }) => {
      const chatMember = await chatService.getChatMember(chatId, userId);

      await messageService.addMessage(
        userId,
        chatId,
        content,
        chatMember[0].userId
      );

      const messages = await messageService.getMessages(chatId);

      chatNamespace.to(chatId).emit("message", messages);
    });

    chatNamespace.on("disconnect", () => {
      console.log("Disconnect");
    });
  });

  return io;
}

module.exports = initializeSocket;
