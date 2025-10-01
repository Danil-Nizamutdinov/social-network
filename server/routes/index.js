const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const chatRouter = require("./chatRouter");
const messageRouter = require("./messageRouter");
const videoRouter = require("./videoRouter");
const channelRouter = require("./channelRouter");
const reactionRouter = require("./reactionRouter");
const commentRouter = require("./commentRouter");
const friendRouter = require("./friendRouter");
const sseRouter = require("./sseRouter");

router.use("/user", userRouter);
router.use("/chat", chatRouter);
router.use("/message", messageRouter);
router.use("/video", videoRouter);
router.use("/channel", channelRouter);
router.use("/reaction", reactionRouter);
router.use("/comment", commentRouter);
router.use("/friend", friendRouter);
router.use("/sse", sseRouter);

module.exports = router;
