const sequelize = require("../../db");
const { DataTypes } = require("sequelize");

const Chat = sequelize.define("chat", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(100), allowNull: true },
  type: {
    type: DataTypes.ENUM("private", "group", "channel"),
    defaultValue: "private",
  },
  description: { type: DataTypes.TEXT, allowNull: true },
});

module.exports = Chat;
