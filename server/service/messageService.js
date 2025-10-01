const { Message, User } = require("../models/models");
const { sseService } = require("./sseService");

class MessageService {
  async addMessage(senderId, chatId, content, friendId) {
    const message = await Message.create({
      chatId,
      senderId,
      content,
    });

    sseService.sendNotification(friendId, "message");

    return message;
  }
  async getMessages(chatId) {
    const messages = await Message.findAll({
      where: { chatId },
      include: [
        {
          model: User,
          as: "Sender",
          attributes: ["id", "login", "avatar"],
        },
      ],
      order: [["createdAt", "ASC"]],
    });

    return messages;
  }
}

module.exports = new MessageService();
