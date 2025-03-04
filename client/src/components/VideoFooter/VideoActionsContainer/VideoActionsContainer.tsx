import React from "react";
import { IVideo } from "@src/types/main";
import VideoHeader from "./VideoHeader/VideoHeader";
import VideoActions from "./VideoActions/VideoActions";
import styles from "./video-actions-c.module.scss";

const VideoActionsContainer: React.FC<{ video: IVideo }> = ({ video }) => {
  return (
    <div className={styles.wrapper}>
      <VideoHeader
        title={video.title}
        description={video.description}
        createdAt={video.createdAt}
      />
      <VideoActions like={video.like} dislike={video.dislike} />
    </div>
  );
};

export default VideoActionsContainer;
