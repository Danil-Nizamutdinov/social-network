const { Channel, Reaction } = require("../models/models");
const channelService = require("../service/channelService");
const fileService = require("../service/fileService");

class ChannelController {
  async getChannel(req, res, next) {
    try {
      const { channelId, userId } = req.query;
      const channel = await channelService.getChannel(channelId, userId);
      return res.json(channel);
    } catch (e) {
      next(e);
    }
  }
  async subscribe(req, res, next) {
    try {
      const { channelId, userId } = req.body;
      const channel = await Channel.findOne({ where: { id: channelId } });
      const reaction = await Reaction.findOne({
        where: { type: "channel", contentId: channelId, userId },
      });

      if (!channel) return res.json({ message: "ошибка" });

      if (reaction) {
        await reaction.destroy();
        channel.subscribers -= 1;
        await channel.save();
        return res.json(reaction);
      } else {
        channel.subscribers += 1;
        const newReaction = await Reaction.create({
          type: "channel",
          contentId: channelId,
          userId: userId,
          emotion: 1,
        });
        await channel.save();
        return res.json(newReaction);
      }
    } catch (e) {
      next(e);
    }
  }
  async updateDescription(req, res, next) {
    try {
      const { channelId, description } = req.body;
      // const channel = await Channel.findByPk(channelId);
      const channel = await channelService.getChannel(channelId);
      if (!channel) return res.json({ message: "не найден" });
      channel.description = description;
      await channel.save();

      return res.json(channel);
    } catch (e) {
      next(e);
    }
  }
  async updateBackground(req, res, next) {
    try {
      const { channelId } = req.body;
      const { background } = req.files;

      const backgroundName = fileService.moveFile(background);

      const channel = await Channel.findByPk(channelId);
      if (!channel) return res.json({ message: "не найден" });
      channel.background = backgroundName;
      await channel.save();

      return res.json(channel);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ChannelController();
