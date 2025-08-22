const Router = require("express");
const commentController = require("../controllers/commentController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = new Router();

router.post(
  "/comment",
  authMiddleware({ checkUserId: true }),
  commentController.createComment
);

module.exports = router;
