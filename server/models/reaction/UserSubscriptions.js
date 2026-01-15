const sequelize = require("../../db");
const { DataTypes } = require("sequelize");

const UserSubscriptions = sequelize.define("userSubscriptions", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  channelId: { type: DataTypes.INTEGER, allowNull: false },
  reactionType: { type: DataTypes.BOOLEAN, allowNull: false },
});

module.exports = UserSubscriptions;
