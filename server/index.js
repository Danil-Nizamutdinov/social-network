require("dotenv").config();

const express = require("express");
const sequelize = require("./db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes/index");
const models = require("./models/models");
const fileUpload = require("express-fileupload");
const errorMiddleware = require("./middlewares/errorMiddleware");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const path = require("path");
const messageService = require("./service/messageService");

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(fileUpload({}));
app.use("/api", router);
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
  socket.on("join", async ({ name, room }) => {
    socket.join(room);
    const messages = await messageService.getMessages(room);
    socket.emit("getMessages", messages);
  });

  socket.on("sendMessage", async ({ userId, chatId, content }) => {
    const message = await messageService.addMessage(userId, chatId, content);
    const messages = await messageService.getMessages(chatId);
    io.to(chatId).emit("message", messages);
  });

  io.on("disconnect", () => {
    console.log("Disconnect");
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log("server start"));
  } catch (e) {
    console.log(e);
  }
};
start();
