const Router = require("express");
const videoController = require("../controllers/videoController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = new Router();

router.post(
  "/video",
  authMiddleware({ checkChannelId: true }),
  videoController.createVideo
);
router.delete(
  "/video",
  authMiddleware({ checkChannelId: true }),
  videoController.deleteVideo
);
router.get("/video", videoController.getVideo);
router.get("/videos", videoController.getVideos);
router.get("/search", videoController.searchVideo);

module.exports = router;
