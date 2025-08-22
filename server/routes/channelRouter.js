const Router = require("express");
const channelController = require("../controllers/channelController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = new Router();

router.get("/channel", channelController.getChannel);
router.post("/subscribe", channelController.subscribe);
router.post(
  "/description",
  authMiddleware({ checkChannelId: true }),
  channelController.updateDescription
);
router.post(
  "/background",
  authMiddleware({ checkChannelId: true }),
  channelController.updateBackground
);

module.exports = router;
