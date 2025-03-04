const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  avatar: { type: DataTypes.STRING },
  login: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
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
  like: { type: DataTypes.INTEGER },
  dislike: { type: DataTypes.INTEGER },
  description: { type: DataTypes.STRING },
});

const Comment = sequelize.define("comment", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  content: { type: DataTypes.STRING },
  like: { type: DataTypes.INTEGER },
  dislike: { type: DataTypes.INTEGER },
});

const Reaction = sequelize.define("reaction", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  contentId: { type: DataTypes.INTEGER, allowNull: false },
  emotion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isIn: [[0, 1]],
    },
  },
  type: {
    type: DataTypes.ENUM("video", "comment", "channel"),
    allowNull: false,
  },
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
  Reaction,
};
