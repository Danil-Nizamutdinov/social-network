const ApiError = require("../exceptions/apiError");

const connections = new Map();

class SseService {
  sendNotification(userId, type) {
    const connection = connections.get(userId);

    if (!connection) {
      throw ApiError.BadRequest("connection не найден");
    }

    if (connection.destroyed || connection.closed) {
      throw ApiError.BadRequest("Соединение закрыто");
    }

    if (!connection.writable || connection.writableEnded) {
      throw ApiError.BadRequest("Соединение недоступно для записи");
    }

    const success = connection.write(`data: ${JSON.stringify(type)}\n\n`);

    if (!success) {
      throw ApiError.BadRequest("Не получилось");
    }
  }
}

module.exports = {
  sseService: new SseService(),
  connections,
};
