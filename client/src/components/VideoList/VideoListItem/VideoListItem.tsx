import React from "react";
import { urlStatic } from "@src/vars";
import { NavLink } from "react-router-dom";
import convertToReadableDate from "@src/helper/readableDate";
import { IVideo } from "@src/types/main";
import styles from "./video-list-item.module.scss";

const VideoListItem: React.FC<{ video: IVideo }> = ({ video }) => {
  return (
    <div>
      <NavLink to={`/video/${video.id}`}>
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
