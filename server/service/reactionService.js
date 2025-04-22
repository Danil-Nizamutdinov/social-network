const { User, Video, VideoReaction } = require("../models/models");
const ApiError = require("../exceptions/apiError");
const { updateLikeCounter } = require("./videoService");

class ReactionService {
  async validateUserAndVideo(userId, videoId) {
    const user = await User.findByPk(userId);
    const video = await Video.findByPk(videoId);
    if (!user || !video) {
      throw ApiError.BadRequest("Пользователя или видео не найдено");
    }
    return true;
  }

  async findReaction(userId, videoId) {
    return await VideoReaction.findOne({
      where: { userId, videoId },
    });
  }

  async addReaction(userId, videoId, reactionType) {
    await this.validateUserAndVideo(userId, videoId);

    const existingReaction = await this.findReaction(userId, videoId);

    if (!existingReaction) {
      return await this.handleNewReaction(userId, videoId, reactionType);
    }

    return await this.handleExistingReaction(
      existingReaction,
      reactionType,
      videoId
    );
  }

  async handleNewReaction(userId, videoId, reactionType) {
    const newReaction = await VideoReaction.create({
      userId,
      videoId,
      reactionType,
    });

    const likeIncrement = reactionType === "like" ? 1 : -1;
    await updateLikeCounter(videoId, likeIncrement);

    return { reactionType: newReaction.reactionType };
  }

  async handleExistingReaction(existingReaction, newReactionType, videoId) {
    const previousReactionType = existingReaction.reactionType;

    if (previousReactionType === newReactionType) {
      await existingReaction.destroy();

      const likeIncrement = newReactionType === "like" ? -1 : 1;
      await updateLikeCounter(videoId, likeIncrement);

      return { reactionType: null };
    }
    return await this.changeReactionType(
      existingReaction,
      previousReactionType,
      newReactionType,
      videoId
    );
  }

  async changeReactionType(reaction, previousType, newType, videoId) {
    reaction.reactionType = newType;
    await reaction.save();

    let likeIncrement = 0;
    if (previousType === "like" && newType === "dislike") {
      likeIncrement = -2;
    } else if (previousType === "dislike" && newType === "like") {
      likeIncrement = 2;
    }

    await updateLikeCounter(videoId, likeIncrement);

    return { reactionType: reaction.reactionType };
  }
}

module.exports = new ReactionService();
