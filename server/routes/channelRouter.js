const Router = require("express");
const channelController = require("../controllers/channelController");
const router = new Router();

router.get("/channel", channelController.getChannel);
router.post("/subscribe", channelController.subscribe);
router.post("/description", channelController.updateDescription);
router.post("/background", channelController.updateBackground);

module.exports = router;
