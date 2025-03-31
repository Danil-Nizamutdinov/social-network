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
}

module.exports = new ReactionController();
