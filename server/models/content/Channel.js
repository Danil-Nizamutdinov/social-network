const sequelize = require("../../db");
const { DataTypes } = require("sequelize");

const Channel = sequelize.define("channel", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  background: { type: DataTypes.STRING },
  avatar: { type: DataTypes.STRING },
  subscribers: { type: DataTypes.INTEGER },
});

module.exports = Channel;
