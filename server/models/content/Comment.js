const sequelize = require("../../db");
const { DataTypes } = require("sequelize");

const Comment = sequelize.define("comment", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  content: { type: DataTypes.STRING },
  like: { type: DataTypes.INTEGER },
  dislike: { type: DataTypes.INTEGER },
});

module.exports = Comment;
