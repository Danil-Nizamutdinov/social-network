const { Op } = require("sequelize");
const { Chat, User, Message } = require("../models/models");
const ApiError = require("../exceptions/apiError");

class ChatService {
  async createChat(user1Id, user2Id) {
    if (!user1Id || !user2Id) {
      throw ApiError.BadRequest("нет id");
    }

    const existingChat = await Chat.findOne({
      where: {
        [Op.or]: [
          { user1Id: user1Id, user2Id: user2Id },
          { user1Id: user2Id, user2Id: user1Id },
        ],
      },
    });

    if (existingChat) {
      throw ApiError.BadRequest(
        "Чат между этими пользователями уже существует"
      );
    }

    const chat = await Chat.create({
      user1Id,
      user2Id,
      lastMessage: "Пока что у вас нет сообщений в этом чате",
    });
    if (!chat) throw ApiError.BadRequest("chat не создался");
    await chat.addUsers(user1Id);
    await chat.addUsers(user2Id);
    return chat;
  }
  async getChats(userId) {
    if (!userId) {
      throw ApiError.BadRequest("нет id");
    }
    const chats = await Chat.findAll({
      where: {
        [Op.or]: [{ user1Id: userId }, { user2Id: userId }],
      },
      include: [
        {
          model: User,
          where: {
            id: {
              [Op.ne]: userId,
            },
          },
          attributes: { exclude: ["password"] },
          through: {
            attributes: [],
          },
        },
      ],
    });
    if (!chats) {
      throw ApiError.BadRequest("chat не найден");
    }
    return chats;
  }
  async getChat(chatId, userId) {
    if (!chatId) {
      return res.json({ message: "ничего нет id" });
    }

    const chat = await Chat.findOne({
      where: { id: chatId },
      include: [
        {
          model: User,
          where: {
            id: {
              [Op.ne]: userId,
            },
          },
          attributes: { exclude: ["password"] },
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!chat) {
      return res.json({ message: "ничего нет" });
    }
    return chat;
  }

  async deleteChat(chatId) {
    const delChat = await Chat.destroy({
      where: {
        id: chatId,
      },
      include: Message,
    });
    return delChat;
  }
}

module.exports = new ChatService();
