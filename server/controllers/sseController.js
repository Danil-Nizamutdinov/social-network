const { connections } = require("../service/sseService");

class sseController {
  async sse(req, res, next) {
    try {
      const userId = parseInt(req.query.userId);

      if (isNaN(userId)) {
        return res.status(400).json({ error: "Некорректный userId" });
      }

      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin": "http://localhost:3002", // ваш клиентский URL
        "Access-Control-Allow-Credentials": "true",
      });

      res.write("event: connected\n");
      res.write(`data: ${JSON.stringify({ status: "connected", userId })}\n\n`);

      const heartbeatInterval = setInterval(() => {
        res.write(": heartbeat\n\n");
      }, 30000);

      connections.set(userId, res);

      req.on("close", () => {
        console.log(`SSE connection closed for userId: ${userId}`);
        clearInterval(heartbeatInterval);
        connections.delete(userId);
        res.end();
      });

      req.on("error", (error) => {
        console.log(`SSE connection error for userId: ${userId}:`, error);
        clearInterval(heartbeatInterval);
        connections.delete(userId);
        res.end();
      });
    } catch (e) {
      console.error("SSE error:", e);
      next(e);
    }
  }
}

module.exports = new sseController();
