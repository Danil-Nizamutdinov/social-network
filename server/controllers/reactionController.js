const reactionService = require("../service/reactionService");
const subscriptionsService = require("../service/subscriptionsService");

class ReactionController {
  async subscribe(req, res, next) {
    try {
      const { userId, channelId } = req.body;
      const subscribeInfo = await subscriptionsService.subscribe(
        userId,
        channelId
      );

      return res.json(subscribeInfo);
    } catch (e) {
      next(e);
    }
  }
  async unsubscribe(req, res, next) {
    try {
      const { userId, channelId } = req.body;
      const subscribeInfo = await subscriptionsService.unsubscribe(
        userId,
        channelId
      );
      return res.json(subscribeInfo);
    } catch (e) {
      next(e);
    }
  }
  async getUserSubscription(req, res, next) {
    try {
      const { userId, channelId } = req.query;
      const userSubscription = await subscriptionsService.findSubscription(
        userId,
        channelId
      );
      if (!userSubscription) {
        return res.json({ isSubscribe: false });
      }
      return res.json({ isSubscribe: true });
    } catch (e) {
      next(e);
    }
  }
  async addReaction(req, res, next) {
    try {
      const { userId, videoId, reactionType } = req.body;

      const reaction = await reactionService.addReaction(
        userId,
        videoId,
        reactionType
      );

      return res.json(reaction);
    } catch (e) {
      next(e);
    }
  }
  async getUserReaction(req, res, next) {
    try {
      const { userId, videoId } = req.query;

      const reaction = await reactionService.findReaction(userId, videoId);

      if (!reaction) {
        return res.json({ reactionType: false });
      }

      return res.json({ reactionType: reaction.reactionType });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ReactionController();
