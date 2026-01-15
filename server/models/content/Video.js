const sequelize = require("../../db");
const { DataTypes } = require("sequelize");

const Video = sequelize.define("video", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING },
  preview: { type: DataTypes.STRING },
  video: { type: DataTypes.STRING },
  likeCounter: { type: DataTypes.INTEGER },
  description: { type: DataTypes.STRING },
});

module.exports = Video;
