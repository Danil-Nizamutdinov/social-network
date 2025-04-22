const { User, Channel, UserSubscriptions } = require("../models/models");
const ApiError = require("../exceptions/apiError");
const { updateSubscribers } = require("./channelService");

class SubscriptionsService {
  async validateUserAndChannel(userId, channelId) {
    const user = await User.findByPk(userId);
    const channel = await Channel.findByPk(channelId);
    if (!user || !channel) {
      throw ApiError.BadRequest("Пользователь или канал не найден");
    }
    return true;
  }

  async findSubscription(userId, channelId) {
    return await UserSubscriptions.findOne({
      where: { userId, channelId },
    });
  }

  async subscribe(userId, channelId) {
    await this.validateUserAndChannel(userId, channelId);

    const userSubscription = await this.findSubscription(userId, channelId);
    if (userSubscription) {
      throw ApiError.BadRequest("Пользователь уже подписан на канал");
    }

    await UserSubscriptions.create({
      userId,
      channelId,
      reactionType: true,
    });

    await updateSubscribers(channelId, true);

    return { isSubscribe: true };
  }

  async unsubscribe(userId, channelId) {
    await this.validateUserAndChannel(userId, channelId);

    const userSubscription = await this.findSubscription(userId, channelId);
    if (!userSubscription) {
      throw ApiError.BadRequest("Пользователь не подписан на канал");
    }

    await userSubscription.destroy();

    await updateSubscribers(channelId, false);
    return { isSubscribe: false };
  }
}

module.exports = new SubscriptionsService();
