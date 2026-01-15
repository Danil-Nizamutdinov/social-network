const {} = require("../models/models");
const friendService = require("../service/friendService");

class FriendController {
  async sendFriendRequest(req, res, next) {
    try {
      const { userId, login } = req.body;
      const result = await friendService.sendFriendRequest(userId, login);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }
  async respondToRequest(req, res, next) {
    try {
      const { requestId, status, userId } = req.body;
      const result = await friendService.respondToRequest(
        requestId,
        status,
        userId
      );
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }
  async getFriendRequests(req, res, next) {
    try {
      const { userId } = req.query;
      const result = await friendService.getFriendRequests(userId);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }
  async getFriends(req, res, next) {
    try {
      const { userId } = req.query;
      const friends = await friendService.getFriends(userId);
      return res.json(friends);
    } catch (e) {
      next(e);
    }
  }
  async delFriend(req, res, next) {
    try {
      const { userId, friendId } = req.body;
      const result = await friendService.delFriend(userId, friendId);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new FriendController();
