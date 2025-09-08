const { User, Chat, ChatMember, Message } = require("../models/models");
const ApiError = require("../exceptions/apiError");
const { Op } = require("sequelize");

class ChatService {
  async createPrivateChat(userId1, userId2) {
    const user1 = await User.findByPk(userId1);
    const user2 = await User.findByPk(userId2);

    if (!user1 || !user2) {
      throw ApiError.BadRequest("Пользователь не найден");
    }

    const chat = await Chat.create({
      type: "private",
    });

    await ChatMember.bulkCreate([
      { chatId: chat.id, userId: userId1, role: "owner" },
      { chatId: chat.id, userId: userId2, role: "owner" },
    ]);

    const createdChat = await Chat.findByPk(chat.id, {
      include: [
        {
          model: User,
          as: "Users",
          through: { attributes: ["role"] },
          attributes: ["id", "login", "email"],
        },
      ],
    });

    return createdChat;
  }
  async getPrivateChats(userId) {
    const chats = await Chat.findAll({
      where: {
        type: "private",
      },
      include: [
        {
          model: ChatMember,
          as: "Members",
          where: { userId },
          attributes: ["role"],
        },
        {
          model: Message,
          as: "Messages",
          attributes: ["id", "content", "senderId", "createdAt"],
          order: [["createdAt", "DESC"]],
          limit: 1,
          separate: true,
        },
        {
          model: User,
          as: "Users",
          where: {
            id: {
              [Op.ne]: userId,
            },
          },
          attributes: ["id", "login", "avatar"],
          through: { attributes: [] },
        },
      ],
    });

    return chats;
  }
  async getPrivateChat(chatId, userId) {
    const chat = await Chat.findByPk(chatId, {
      include: [
        {
          model: User,
          as: "Users",
          where: {
            id: {
              [Op.ne]: userId,
            },
          },
          attributes: ["id", "login", "avatar"],
        },
      ],
    });

    return chat;
  }
}

module.exports = new ChatService();
