const { Friend, User, Message, Chat } = require("../models/models");
const ApiError = require("../exceptions/apiError");
const chatService = require("./chatService");
const { sseService } = require("./sseService");
const { Sequelize } = require("../db");

class FriendService {
  async sendFriendRequest(userId, login) {
    const friend = await User.findOne({ where: { login } });

    if (!friend) {
      throw ApiError.BadRequest("Пользователя с таким login не существует");
    }

    const friendId = friend.id;

    if (userId === friendId) {
      throw ApiError.BadRequest("Нельзя отправить запрос самому себе");
    }

    const existingRequest = await Friend.findOne({
      where: {
        userId: userId,
        friendId: friendId,
      },
    });

    const reverseRequest = await Friend.findOne({
      where: {
        userId: friendId,
        friendId: userId,
      },
    });

    if (existingRequest || reverseRequest) {
      throw ApiError.BadRequest("Запрос в друзья уже существует");
    }

    sseService.sendNotification(friendId, "contact");

    const friendRequest = await Friend.create({
      userId: userId,
      friendId: friendId,
      status: "pending",
    });

    return friendRequest;
  }

  async respondToRequest(requestId, status, userId) {
    if (!["accepted", "rejected", "blocked"].includes(status)) {
      throw ApiError.BadRequest("Неверный статус запроса");
    }

    const friendRequest = await Friend.findOne({ where: { id: requestId } });

    if (!friendRequest) {
      throw ApiError.BadRequest("Запрос в друзья не найден");
    }

    if (Number(userId) !== friendRequest.friendId) {
      throw ApiError.BadRequest("Нет прав");
    }

    await Friend.update({ status: status }, { where: { id: requestId } });

    if (status === "accepted") {
      const chat = await chatService.createPrivateChat(
        userId,
        friendRequest.userId
      );
      const reverseFriendship = await Friend.findOne({
        where: {
          userId: friendRequest.friendId,
          friendId: friendRequest.userId,
        },
      });

      await Friend.update({ chatId: chat.id }, { where: { id: requestId } });
      if (!reverseFriendship) {
        await Friend.create({
          userId: friendRequest.friendId,
          friendId: friendRequest.userId,
          status: "accepted",
          chatId: chat.id,
        });
      }
    } else {
      await friendRequest.destroy();
    }

    const result = `Запрос в друзья ${
      status === "accepted" ? "принят" : "отклонен"
    }`;

    return {
      message: result,
    };
  }

  async getFriendRequests(userId) {
    const incomingRequests = await Friend.findAll({
      where: {
        friendId: userId,
        status: "pending",
      },
      include: [
        { model: User, as: "User", attributes: ["id", "login", "avatar"] },
      ],
    });

    const outgoingRequests = await Friend.findAll({
      where: {
        userId: userId,
        status: "pending",
      },
      include: [
        { model: User, as: "Friend", attributes: ["id", "login", "avatar"] },
      ],
    });

    const formattedOutgoing = outgoingRequests.map((request) => ({
      User: request.Friend,
      createdAt: request.createdAt,
      friendId: request.friendId,
      id: request.id,
      status: request.status,
      updatedAt: request.updatedAt,
      userId: request.userId,
    }));

    return {
      incoming: incomingRequests,
      outgoing: formattedOutgoing,
    };
  }

  async getFriends(userId) {
    const parseUserId = Number(userId);

    const friends = await Friend.findAll({
      where: {
        userId: parseUserId,
        status: "accepted",
      },
      include: [
        {
          model: User,
          as: "Friend",
          attributes: ["id", "login", "email", "avatar"],
        },
      ],
    });

    return friends;
  }

  async delFriend(userId, friendId) {
    const friend = await Friend.findOne({
      where: { friendId },
    });
    if (!friend) throw new Error("Друг не найден");

    const chatId = friend.chatId;

    await Message.destroy({ where: { chatId } });

    await Chat.destroy({ where: { id: chatId } });

    await Friend.destroy({ where: { friendId } });

    await Friend.destroy({ where: { friendId: userId } });

    return { message: "200" };
  }
}

module.exports = new FriendService();
