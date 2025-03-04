const Router = require("express");
const commentController = require("../controllers/commentController");
const router = new Router();

router.post("/comment", commentController.createComment);

module.exports = router;
