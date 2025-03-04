const { Video, Comment } = require("../models/models");

class ReactionService {
  async updateReaction(type, contentId, emotion, count) {
    const Model = this.getModel(type);
    if (!Model) throw new Error("Неверный тип контента");

    const content = await Model.findOne({ where: { id: contentId } });
    if (!content) throw new Error("Контент не найден");

    if (emotion === 1) {
      content.like += count;
    }
    if (emotion === 0) {
      content.dislike += count;
    }

    await content.save();
    return content;
  }
  getModel(type) {
    switch (type) {
      case "video":
        return Video;
      case "comment":
        return Comment;
      default:
        return;
    }
  }
}

module.exports = new ReactionService();
