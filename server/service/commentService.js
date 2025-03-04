class CommentService {
  async getMessages(chatId) {
    const messages = await Message.findAll({ where: { chatId } });
    return messages;
  }
}

module.exports = new CommentService();
