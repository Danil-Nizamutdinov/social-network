const { Reaction } = require("../models/models");
const reactionService = require("../service/reactionService");

class ReactionController {
  async addReaction(req, res, next) {
    try {
      const { type, contentId, userId, emotion } = req.body;

      const parsedContentId = Number(contentId);
      const parsedUserId = Number(userId);
      const parsedEmotion = Number(emotion);

      const reaction = await Reaction.findOne({
        where: { type, contentId: parsedContentId, userId: parsedUserId },
      });

      if (!reaction) {
        const newReaction = await Reaction.create({
          type,
          contentId: parsedContentId,
          userId: parsedUserId,
          emotion: parsedEmotion,
        });
        const r = await reactionService.updateReaction(
          type,
          parsedContentId,
          parsedEmotion,
          1
        );
        return res.json({ newReaction, r });
      }

      if (reaction.emotion === parsedEmotion) {
        const r = await reactionService.updateReaction(
          type,
          parsedContentId,
          parsedEmotion,
          -1
        );
        await reaction.destroy();
        return res.json({ reaction, r });
      }

      if (reaction.emotion !== parsedEmotion) {
        const oldEmotionValue = reaction.emotion;
        await reactionService.updateReaction(
          type,
          parsedContentId,
          parsedEmotion,
          1
        );
        await reactionService.updateReaction(
          type,
          parsedContentId,
          oldEmotionValue,
          -1
        );
        reaction.emotion = parsedEmotion;
        await reaction.save();
        return res.json(reaction);
      }
    } catch (e) {
      next(e);
    }
  }
  async getReaction(req, res, next) {
    try {
      const { type, contentId, userId } = req.query;
      const reaction = await Reaction.findOne({
        where: { type, contentId, userId },
      });
      return res.json(reaction);
    } catch (e) {
      next(e);
    }
  }
  async getReactions(req, res, next) {
    try {
      const { userId, type } = req.query;

      const reactions = await Reaction.findAll({ where: { userId, type } });

      return res.json(reactions);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ReactionController();
