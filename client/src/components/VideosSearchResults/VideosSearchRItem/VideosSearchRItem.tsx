import convertToReadableDate from "@src/helper/readableDate";
import { IVideo } from "@src/types/main";
import { urlStatic } from "@src/vars";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./videos-search-ri.module.scss";

const VideosSearchRItem: React.FC<{ video: IVideo }> = ({ video }) => {
  return (
    <div className={styles.videos_item}>
      <div className={styles.preview_box}>
        <Link to={`/video/${video.id}`}>
          <img src={urlStatic + video.preview} alt="preview" />
        </Link>
      </div>
      <div>
        <Link to={`/video/${video.id}`}>
          <p className={`${styles.title} ${styles.info_item}`}>{video.title}</p>
          <p className={styles.info_item}>
            {convertToReadableDate(video.createdAt)}
          </p>
        </Link>
        <div className={`${styles.channel_info} ${styles.info_item}`}>
          <Link to={`/channel/${video.channel.id}`}>
            <img src={urlStatic + video.channel.avatar} alt="avatar" />
          </Link>
          {video.channel.name}
        </div>
        <Link to={`/channel/${video.channel.id}`}>
          <p className={styles.info_item}>{video.description}</p>
        </Link>
      </div>
    </div>
  );
};

export default VideosSearchRItem;
