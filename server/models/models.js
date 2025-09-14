const User = require("./user/User");
const LoginAttempt = require("./user/LoginAttempt");
const TempUser = require("./user/TempUser");
const Token = require("./user/Token");
const Friend = require("./user/Friend");

const Chat = require("./chat/Chat");
const Message = require("./chat/Message");
const ChatMember = require("./chat/ChatMember");

const Channel = require("./content/Channel");
const Video = require("./content/Video");
const Comment = require("./content/Comment");

const VideoReaction = require("./reaction/VideoReaction");
const CommentReaction = require("./reaction/CommentReaction");
const UserSubscriptions = require("./reaction/UserSubscriptions");

const Notification = require("./Notification/Notification");

require("./associations")({
  User,
  Token,
  Chat,
  Message,
  Channel,
  Video,
  Comment,
  Friend,
  ChatMember,
  Notification,
});

module.exports = {
  User,
  Token,
  Chat,
  Message,
  ChatMember,
  Channel,
  Video,
  Comment,
  VideoReaction,
  CommentReaction,
  UserSubscriptions,
  TempUser,
  LoginAttempt,
  Friend,
  Notification,
};
