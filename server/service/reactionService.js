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
    const transaction = await Sequelize.transaction();

    await this.validateUserAndVideo(userId, videoId);

    const userReaction = await this.findReaction(userId, channelId);

    if (!userReaction) {
      const videoReaction = await VideoReaction.create(
        {
          userId,
          videoId,
          reactionType,
        },
        { transaction }
      );

      await transaction.commit();
      return { reactionType: videoReaction.reactionType };
    }

    const previousReactionType = userReaction.reactionType;

    if (previousReactionType === reactionType) {
      userReaction.destroy({ transaction });
      await transaction.commit();
      return { reactionType: userReaction.reactionType };
    }

    userReaction.reactionType = reactionType;
    await userReaction.save({ transaction });

    let num = 0;
    if (previousReactionType === "like" && reactionType === "dislike") {
      num = -2;
    } else if (previousReactionType === "dislike" && reactionType === "like") {
      num = 2;
    } else if (previousReactionType === "like" && reactionType === "like") {
      num = -1;
    } else if (
      previousReactionType === "dislike" &&
      reactionType === "dislike"
    ) {
      num = 1;
    }

    if (num !== 0) {
      await updateLikeCounter(videoId, num, transaction);
    }

    await transaction.commit();
    return { reactionType: userReaction.reactionType };
  }
}

module.exports = new ReactionService();
