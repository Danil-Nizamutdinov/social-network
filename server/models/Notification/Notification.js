const sequelize = require("../../db");
const { DataTypes } = require("sequelize");
const { User } = require("../models");

const Notification = sequelize.define("notification", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.ENUM("FRIEND_REQUEST", "FRIEND_ACCEPTED", "MESSAGE"),
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  receiverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  relatedId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Notification;
