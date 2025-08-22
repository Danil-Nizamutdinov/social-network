const Router = require("express");
const chatController = require("../controllers/chatController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = new Router();

router.post("/chat", authMiddleware(), chatController.createChat);
router.get("/chats", authMiddleware(), chatController.getChats);
router.get("/chat", authMiddleware(), chatController.getChat);
router.delete("/chat", authMiddleware(), chatController.deleteChat);

module.exports = router;
