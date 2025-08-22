import React from "react";
import { urlStatic } from "@src/vars";
import { NavLink } from "react-router-dom";
import convertToReadableDate from "@src/helper/readableDate";
import { IVideo } from "@src/types/main";
import trash from "@src/assets/trash.png";
import ButtonImg from "@src/components/ButtonImg/ButtonImg";
import { useDeleteVideoMutation } from "@src/services/VideoService";
import styles from "./video-list-item.module.scss";

interface IVideoListItemProps {
  video: IVideo;
  // eslint-disable-next-line react/require-default-props
  isOwner?: boolean;
}

const VideoListItem: React.FC<IVideoListItemProps> = ({
  video,
  isOwner = false,
}) => {
  const [deleteVideo] = useDeleteVideoMutation();

  const handleDeleteVideo = async () => {
    await deleteVideo({ videoId: video.id, channelId: video.channel.id });
  };

  return (
    <div className={styles.video_list_item}>
      {isOwner && (
        <div className={styles.del}>
          <ButtonImg img={trash} handleOnClick={handleDeleteVideo} />
        </div>
      )}
      <NavLink to={`/video/${video.id}`} onClick={() => window.scrollTo(0, 0)}>
        <img
          src={urlStatic + video.preview}
          alt="preview"
          className={styles.preview}
        />
      </NavLink>
      <div className={styles.video_info_box}>
        <NavLink to={`/channel/${video.channel.id}`}>
          <img
            src={urlStatic + video.channel.avatar}
            alt="avatar"
            className={styles.ava}
          />
        </NavLink>
        <div className={styles.video_info}>
          <h1 className={styles.video_title}>{video.title}</h1>
          <p className={styles.video_subtitle}>
            {video.channel.name}*{convertToReadableDate(video.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoListItem;
