const sequelize = require("../../db");
const { DataTypes } = require("sequelize");

const LoginAttempt = sequelize.define("loginAttempt", {
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  attemptCount: { type: DataTypes.INTEGER, defaultValue: 0 },
  lastAttempt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  blockedUntil: { type: DataTypes.DATE, allowNull: true },
});

module.exports = LoginAttempt;
