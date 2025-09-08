const sequelize = require("../../db");
const { DataTypes } = require("sequelize");

const CommentReaction = sequelize.define("commentReaction", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  commentId: { type: DataTypes.INTEGER, allowNull: false },
  reactionType: { type: DataTypes.ENUM("like", "dislike"), allowNull: false },
});

module.exports = CommentReaction;
