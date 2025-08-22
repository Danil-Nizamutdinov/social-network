const Router = require("express");
const reactionController = require("../controllers/reactionController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = new Router();

router.post(
  "/subscribe",
  authMiddleware({ checkUserId: true }),
  reactionController.subscribe
);
router.post(
  "/unsubscribe",
  authMiddleware({ checkUserId: true }),
  reactionController.unsubscribe
);
router.post(
  "/reaction",
  authMiddleware({ checkUserId: true }),
  reactionController.addReaction
);
router.get("/subscription", reactionController.getUserSubscription);
router.get("/reaction", reactionController.getUserReaction);

module.exports = router;
