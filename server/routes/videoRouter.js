const Router = require("express");
const videoController = require("../controllers/videoController");
const router = new Router();

router.post("/video", videoController.createVideo);
router.get("/video", videoController.getVideo);
router.get("/videos", videoController.getVideos);

module.exports = router;
