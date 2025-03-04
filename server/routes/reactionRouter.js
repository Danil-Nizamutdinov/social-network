const Router = require("express");
const reactionController = require("../controllers/reactionController");
const router = new Router();

router.post("/reaction", reactionController.addReaction);
router.get("/reaction", reactionController.getReaction);
router.get("/reactions", reactionController.getReactions);

module.exports = router;
