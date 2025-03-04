import React from "react";
import { VideoResponse } from "@src/types/main";
import styles from "./video-footer.module.scss";
import VideoActionsContainer from "./VideoActionsContainer/VideoActionsContainer";
import Subscribe from "./Subscribe/Subscribe";
import Comment from "./Comment/Comment";

const VideoFooter: React.FC<{ data: VideoResponse }> = ({ data }) => {
  return (
    <div className={styles.vide_footer}>
      <VideoActionsContainer video={data.video} />
      <Subscribe
        avatar={data.video.channel.avatar}
        subscribers={data.video.channel.subscribers}
        name={data.video.channel.name}
        channelId={data.video.channel.id}
      />
      <Comment comments={data.comments} />
    </div>
  );
};

export default VideoFooter;
