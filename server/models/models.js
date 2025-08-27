const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  avatar: { type: DataTypes.STRING },
  login: { type: DataTypes.STRING, unique: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
});

const LoginAttempt = sequelize.define("LoginAttempt", {
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  attemptCount: { type: DataTypes.INTEGER, defaultValue: 0 },
  lastAttempt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  blockedUntil: { type: DataTypes.DATE, allowNull: true },
});

const TempUser = sequelize.define("TempUser", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  login: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  verificationCode: { type: DataTypes.STRING, allowNull: false },
  codeExpires: { type: DataTypes.DATE, allowNull: false },
  resendCooldown: { type: DataTypes.DATE, allowNull: false },
});

const Token = sequelize.define("token", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  refreshToken: { type: DataTypes.STRING, unique: true },
});

const Chat = sequelize.define("chat", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  lastMessage: { type: DataTypes.STRING, allowNull: true },
  user1Id: { type: DataTypes.INTEGER },
  user2Id: { type: DataTypes.INTEGER },
});

const Message = sequelize.define("message", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER },
  chatId: { type: DataTypes.INTEGER },
  content: { type: DataTypes.TEXT },
});

const ChatUser = sequelize.define("ChatUser", {
  userId: { type: DataTypes.INTEGER, references: { model: User, key: "id" } },
  chatId: { type: DataTypes.INTEGER, references: { model: Chat, key: "id" } },
});

const Channel = sequelize.define("channel", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  background: { type: DataTypes.STRING },
  avatar: { type: DataTypes.STRING },
  subscribers: { type: DataTypes.INTEGER },
});
const Video = sequelize.define("video", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING },
  preview: { type: DataTypes.STRING },
  video: { type: DataTypes.STRING },
  likeCounter: { type: DataTypes.INTEGER },
  description: { type: DataTypes.STRING },
});

const Comment = sequelize.define("comment", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  content: { type: DataTypes.STRING },
  like: { type: DataTypes.INTEGER },
  dislike: { type: DataTypes.INTEGER },
});

const VideoReaction = sequelize.define("VideoReaction", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  videoId: { type: DataTypes.INTEGER, allowNull: false },
  reactionType: { type: DataTypes.ENUM("like", "dislike"), allowNull: false },
});

const CommentReaction = sequelize.define("CommentReaction", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  commentId: { type: DataTypes.INTEGER, allowNull: false },
  reactionType: { type: DataTypes.ENUM("like", "dislike"), allowNull: false },
});

const UserSubscriptions = sequelize.define("UserSubscriptions", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  channelId: { type: DataTypes.INTEGER, allowNull: false },
  reactionType: { type: DataTypes.BOOLEAN, allowNull: false },
});

User.hasOne(Token);
Token.belongsTo(User);

User.belongsToMany(Chat, { through: "ChatUser", foreignKey: "userId" });
Chat.belongsToMany(User, { through: "ChatUser", foreignKey: "chatId" });

Chat.hasMany(Message, { onDelete: "cascade" });
Message.belongsTo(Chat);

User.hasOne(Channel);
Channel.belongsTo(User);

Channel.hasMany(Video);
Video.belongsTo(Channel);

Video.hasMany(Comment);
Comment.belongsTo(Video);

User.hasMany(Comment);
Comment.belongsTo(User);

module.exports = {
  User,
  Token,
  Chat,
  Message,
  ChatUser,
  Channel,
  Video,
  Comment,
  VideoReaction,
  CommentReaction,
  UserSubscriptions,
  TempUser,
  LoginAttempt,
};
