const { Comment, User } = require("../models/models");

class CommentController {
  async createComment(req, res, next) {
    try {
      const { userId, videoId, content } = req.body;
      const comment = await Comment.create({
        userId,
        videoId,
        content,
        like: 0,
        dislike: 0,
      });
      const newComment = await Comment.findByPk(comment.id, {
        include: [
          {
            model: User,
            attributes: { exclude: ["password"] },
          },
        ],
      });
      return res.json(newComment);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new CommentController();
