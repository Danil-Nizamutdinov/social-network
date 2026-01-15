const sequelize = require("../../db");
const { DataTypes } = require("sequelize");

const TempUser = sequelize.define("tempUser", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  login: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  verificationCode: { type: DataTypes.STRING, allowNull: false },
  codeExpires: { type: DataTypes.DATE, allowNull: false },
  resendCooldown: { type: DataTypes.DATE, allowNull: false },
});

module.exports = TempUser;
