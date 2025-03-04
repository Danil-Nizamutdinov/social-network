import React from "react";
import styles from "./video-list.module.scss";
import VideoListItem from "./VideoListItem/VideoListItem";
import { IVideo } from "../../types/main";

const VideoList: React.FC<{ videos: IVideo[] }> = ({ videos }) => {
  return (
    <div className={styles.video_list}>
      {videos.map((video: IVideo) => (
        <VideoListItem video={video} key={video.id} />
      ))}
    </div>
  );
};

export default VideoList;
