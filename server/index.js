require("dotenv").config();
const initializeSocket = require("./socket/socket");
const express = require("express");
const sequelize = require("./db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes/index");
const fileUpload = require("express-fileupload");
const errorMiddleware = require("./middlewares/errorMiddleware");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const path = require("path");
const cronService = require("./service/cronService");

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

initializeSocket(io);

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
cronService.init();
