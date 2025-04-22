const Router = require("express");
const reactionController = require("../controllers/reactionController");
const router = new Router();

router.post("/subscribe", reactionController.subscribe);
router.post("/unsubscribe", reactionController.unsubscribe);
router.get("/subscription", reactionController.getUserSubscription);
router.post("/reaction", reactionController.addReaction);
router.get("/reaction", reactionController.getUserReaction);

module.exports = router;
