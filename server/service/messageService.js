const { Message, Chat } = require("../models/models");

class MessageService {
  async addMessage(userId, chatId, content) {
    const message = await Message.create({ userId, chatId, content });
    const chat = await Chat.findOne({ where: { id: chatId } });
    if (chat) {
      chat.lastMessage = content;
      chat.save();
    }
    return message;
  }
  async getMessages(chatId) {
    const messages = await Message.findAll({ where: { chatId } });
    return messages;
  }
}

module.exports = new MessageService();
