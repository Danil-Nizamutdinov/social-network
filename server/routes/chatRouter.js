const Router = require("express");
const chatController = require("../controllers/chatController");
const router = new Router();

router.post("/chat", chatController.createChat);
router.get("/chats", chatController.getChats);
router.get("/chat", chatController.getChat);
router.delete("/chat", chatController.deleteChat);

module.exports = router;
