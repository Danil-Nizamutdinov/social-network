const Router = require("express");
const messageController = require("../controllers/messageController");
const router = new Router();

router.post("/message", messageController.addMessage);
router.get("/message", messageController.getMessages);

module.exports = router;
