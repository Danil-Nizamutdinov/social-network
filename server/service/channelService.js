const { Channel } = require("../models/models");

class ChannelService {
  async createChannel(userId, login) {
    const channel = await Channel.create({
      name: login,
      description: null,
      background: "background.jpg",
      avatar: "ava.png",
      subscribers: 0,
      userId,
    });
    return channel;
  }
  async getChannel(channelId, userId) {
    if (userId) {
      const channel = await Channel.findOne({
        where: { userId },
      });
      return channel;
    }
    const channel = await Channel.findOne({
      where: {
        id: channelId,
      },
    });
    return channel;
  }

  async updateSubscribers(channelId, increment = true) {
    const channel = await Channel.findOne({
      where: {
        id: channelId,
      },
    });

    if (!channel) {
      throw new Error("Channel not found");
    }

    channel.subscribers += increment ? 1 : -1;
    await channel.save();
    return channel;
  }
}

module.exports = new ChannelService();
