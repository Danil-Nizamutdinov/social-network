module.exports = associations = (models) => {
  const {
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
  } = models;

  User.hasMany(Friend, { as: "Friendships", foreignKey: "userId" });
  Friend.belongsTo(User, { as: "User", foreignKey: "userId" });
  Friend.belongsTo(User, { as: "Friend", foreignKey: "friendId" });

  Notification.belongsTo(User, { as: "Sender", foreignKey: "senderId" });
  Notification.belongsTo(User, { as: "Receiver", foreignKey: "receiverId" });

  User.hasMany(Message, { as: "Messages", foreignKey: "senderId" });
  Message.belongsTo(User, { as: "Sender", foreignKey: "senderId" });

  Chat.hasMany(Message, { as: "Messages", foreignKey: "chatId" });
  Message.belongsTo(Chat, { as: "Chat", foreignKey: "chatId" });

  Chat.hasMany(ChatMember, { as: "Members", foreignKey: "chatId" });
  ChatMember.belongsTo(Chat, { as: "Chat", foreignKey: "chatId" });

  User.hasMany(ChatMember, { as: "ChatMemberships", foreignKey: "userId" });
  ChatMember.belongsTo(User, { as: "Member", foreignKey: "userId" });

  // Многие-ко-многим через ChatMember
  User.belongsToMany(Chat, {
    through: ChatMember,
    as: "Chats",
    foreignKey: "userId",
    otherKey: "chatId",
  });

  Chat.belongsToMany(User, {
    through: ChatMember,
    as: "Users",
    foreignKey: "chatId",
    otherKey: "userId",
  });

  User.hasOne(Token);
  Token.belongsTo(User);

  User.hasOne(Channel);
  Channel.belongsTo(User);

  Channel.hasMany(Video);
  Video.belongsTo(Channel);

  Video.hasMany(Comment);
  Comment.belongsTo(Video);

  User.hasMany(Comment);
  Comment.belongsTo(User);
};
