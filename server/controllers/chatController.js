const chatService = require("../service/chatService");

class ChatController {
  async getPrivateChats(req, res, next) {
    try {
      const { userId } = req.query;
      const chats = await chatService.getPrivateChats(userId);
      return res.json(chats);
    } catch (error) {
      next(error);
    }
  }
  async getPrivateChat(req, res, next) {
    try {
      const { chatId, userId } = req.query;
      const chat = await chatService.getPrivateChat(chatId, userId);
      return res.json(chat);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ChatController();
