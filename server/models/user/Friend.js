const sequelize = require("../../db");
const { DataTypes } = require("sequelize");
const { User } = require("../models");

const Friend = sequelize.define("friend", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: User, key: "id" },
  },
  friendId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: User, key: "id" },
  },
  status: {
    type: DataTypes.ENUM("pending", "accepted", "rejected", "blocked"),
    defaultValue: "pending",
  },
});

module.exports = Friend;
