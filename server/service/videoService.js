const { Op } = require("sequelize");
const { Video, Channel, Comment, User } = require("../models/models");
const paginationService = require("./paginationService");

class VideoService {
  async updateLikeCounter(videoId, num) {
    const video = await Video.findOne({
      where: {
        id: videoId,
      },
    });

    if (!video) {
      throw new Error("Channel not found");
    }

    video.likeCounter += num;
    await video.save();
    return video;
  }
  async createVideo(channelId, title, previewName, description, fileName) {
    const parsedChannelId = Number(channelId);
    console.log(channelId, title, previewName, description, fileName);
    const videoData = await Video.create({
      channelId: parsedChannelId,
      title,
      preview: previewName,
      video: fileName,
      likeCounter: 0,
      description,
    });

    console.log(videoData);

    return videoData;
  }
  async getVideo(videoId) {
    if (videoId) {
      const video = await Video.findOne({
        where: { id: videoId },
        include: [{ model: Channel }],
      });
      const comments = await Comment.findAll({
        where: { videoId },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: User,
            attributes: { exclude: ["password"] },
          },
        ],
      });
      return { video, comments };
    }
    const videos = await Video.findAll({ include: Channel });
    return videos;
  }
  async getVideo(videoId) {
    const video = await Video.findOne({
      where: { id: videoId },
      include: [{ model: Channel }],
    });
    const comments = await Comment.findAll({
      where: { videoId },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          attributes: { exclude: ["password"] },
        },
      ],
    });
    return { video, comments };
  }
  async getVideos(page, limit, channelId) {
    const { parsedPage, parsedLimit, offset } =
      paginationService.calculatePagination(page, limit);

    let totalPages = await paginationService.calculateTotalPages(
      Video,
      parsedLimit
    );

    if (channelId) {
      const videos = await Video.findAll({
        where: { channelId },
        include: Channel,
        limit,
        offset,
      });
      return { videos, page, totalPages };
    }

    const videos = await Video.findAll({ include: Channel, limit, offset });

    return { videos, page: parsedPage, totalPages };
  }
  async searchVideos(title, page, limit) {
    page = 1;
    const totalPages = limit;

    const videos = await Video.findAll({
      where: {
        title: {
          [Op.iLike]: `%${title}%`,
        },
      },
      include: Channel,
    });

    return { videos, page, totalPages };
  }
}

module.exports = new VideoService();
