const { Message, Chat } = require("../models/models");
const messageService = require("../service/messageService");

class ChatController {
  async addMessage(req, res, next) {
    try {
      const { userId, chatId, content } = req.body;
      const message = await messageService.addMessage(userId, chatId, content);
      return res.json(message);
    } catch (error) {
      next(error);
    }
  }
  async getMessages(req, res, next) {
    try {
      const { chatId } = req.body;
      const messages = await messageService.getMessages(chatId);
      return res.json(messages);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ChatController();
