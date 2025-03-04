const { Chat } = require("../models/models");
const chatService = require("../service/chatService");

class ChatController {
  async createChat(req, res, next) {
    try {
      const { user1Id, user2Id } = req.body;
      const chat = await chatService.createChat(user1Id, user2Id);
      return res.json(chat);
    } catch (error) {
      next(error);
    }
  }
  async getChats(req, res, next) {
    try {
      const { userId } = req.query;
      const chats = await chatService.getChats(userId);
      return res.json(chats);
    } catch (error) {
      next(error);
    }
  }
  async getChat(req, res, next) {
    try {
      const { chatId, userId } = req.query;
      const chat = await chatService.getChat(chatId, userId);
      return res.json(chat);
    } catch (error) {
      next(error);
    }
  }
  async deleteChat(req, res, next) {
    try {
      const { chatId } = req.query;
      const delChat = await chatService.deleteChat(chatId);
      return res.json(delChat);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ChatController();
