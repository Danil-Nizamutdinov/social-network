import React from "react";
import { IVideo } from "@src/types/main";
import VideoHeader from "./VideoHeader/VideoHeader";
import VideoActions from "./VideoActions/VideoActions";
import styles from "./video-actions-c.module.scss";

interface VideoActionsCProps {
  video: IVideo;
  refetch: () => void;
}

const VideoActionsContainer: React.FC<VideoActionsCProps> = ({
  video,
  refetch,
}) => {
  return (
    <div className={styles.wrapper}>
      <VideoHeader
        title={video.title}
        description={video.description}
        createdAt={video.createdAt}
      />
      <VideoActions
        likeCounter={video.likeCounter}
        videoId={video.id}
        refetch={refetch}
      />
    </div>
  );
};

export default VideoActionsContainer;
