const sequelize = require("../../db");
const { DataTypes } = require("sequelize");

const VideoReaction = sequelize.define("videoReaction", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  videoId: { type: DataTypes.INTEGER, allowNull: false },
  reactionType: { type: DataTypes.ENUM("like", "dislike"), allowNull: false },
});

module.exports = VideoReaction;
