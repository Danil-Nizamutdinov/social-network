const sequelize = require("../../db");
const { DataTypes } = require("sequelize");
const { User, Chat } = require("../models");

const ChatMember = sequelize.define("chatMember", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  chatId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Chat, key: "id" },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: User, key: "id" },
  },
  role: {
    type: DataTypes.ENUM("member", "admin", "owner"),
    defaultValue: "member",
  },
});

module.exports = ChatMember;
