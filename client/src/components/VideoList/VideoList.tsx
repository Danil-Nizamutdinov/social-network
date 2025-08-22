import React from "react";
import styles from "./video-list.module.scss";
import VideoListItem from "./VideoListItem/VideoListItem";
import { IVideo } from "../../types/main";

interface IVideoListProps {
  videos: IVideo[];
  // eslint-disable-next-line react/require-default-props
  isOwner?: boolean;
}

const VideoList: React.FC<IVideoListProps> = ({ videos, isOwner = false }) => {
  return (
    <div className={styles.video_list}>
      {videos.map((video: IVideo) => (
        <VideoListItem video={video} key={video.id} isOwner={isOwner} />
      ))}
    </div>
  );
};

export default VideoList;
