const sequelize = require("../../db");
const { DataTypes } = require("sequelize");
const { Chat, User } = require("../models");

const Message = sequelize.define("message", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  chatId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Chat, key: "id" },
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: User, key: "id" },
  },
  content: { type: DataTypes.TEXT, allowNull: false },
});

module.exports = Message;
