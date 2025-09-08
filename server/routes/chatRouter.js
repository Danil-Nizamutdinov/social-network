const Router = require("express");
const chatController = require("../controllers/chatController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = new Router();

router.get("/chats", chatController.getPrivateChats);
router.get("/chat", chatController.getPrivateChat);

module.exports = router;
