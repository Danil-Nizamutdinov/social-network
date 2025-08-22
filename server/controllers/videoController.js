const videoService = require("../service/videoService");
const fileService = require("../service/fileService");

class VideoController {
  async createVideo(req, res, next) {
    try {
      const { channelId, title, description } = req.body;
      const { video, preview } = req.files;

      const videoName = fileService.moveFile(video);
      const previewName = fileService.moveFile(preview);

      const videoData = await videoService.createVideo(
        channelId,
        title,
        previewName,
        description,
        videoName
      );

      return res.json(videoData);
    } catch (e) {
      next(e);
    }
  }

  async getVideo(req, res, next) {
    try {
      const { videoId } = req.query;

      const videos = await videoService.getVideo(videoId);
      return res.json(videos);
    } catch (e) {
      next(e);
    }
  }
  async getVideos(req, res, next) {
    try {
      let { page, limit, channelId } = req.query;

      const videos = await videoService.getVideos(page, limit, channelId);
      return res.json(videos);
    } catch (e) {
      next(e);
    }
  }
  async searchVideo(req, res, next) {
    try {
      let { title, page, limit } = req.query;
      const videos = await videoService.searchVideos(title, page, limit);
      return res.json(videos);
    } catch (e) {
      next(e);
    }
  }
  async deleteVideo(req, res, next) {
    try {
      const { videoId } = req.body;
      const delVideo = await videoService.deleteVideo(videoId);
      return res.json(delVideo);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new VideoController();
