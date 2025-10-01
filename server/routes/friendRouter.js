const Router = require("express");
const friendController = require("../controllers/friendController");
const router = new Router();

router.post("/request", friendController.sendFriendRequest);
router.post("/response", friendController.respondToRequest);
router.post("/del", friendController.delFriend);

router.get("/friends", friendController.getFriends);
router.get("/request", friendController.getFriendRequests);

module.exports = router;
