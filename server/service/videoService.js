const { Video, Channel, Comment, User } = require("../models/models");

class VideoService {
  async updateLikeCounter(videoId, num, transaction) {
    await Video.update(
      {
        likeCounter: Sequelize.literal(`likeCounter + ${num}`),
      },
      {
        where: { id: videoId },
        transaction,
      }
    );
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
    const parsedPage = Number(page);
    const parsedLimit = Number(limit);

    page = parsedPage || 1;
    limit = parsedLimit || 9;

    let offset = page * limit - limit;

    const count = await Video.count();
    let totalPages = Math.ceil(count / limit);

    if (channelId) {
      const videos = await Video.findAll({
        where: { channelId },
        include: Channel,
      });
      return { videos, page, totalPages };
    }

    const videos = await Video.findAll({ include: Channel, limit, offset });

    return { videos, page, totalPages };
  }
}

module.exports = new VideoService();
