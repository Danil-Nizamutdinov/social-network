import React from "react";
import { VideoResponse } from "@src/types/main";
import styles from "./video-footer.module.scss";
import VideoActionsContainer from "./VideoActionsContainer/VideoActionsContainer";
import Subscribe from "./Subscribe/Subscribe";
import Comment from "./Comment/Comment";

interface VideoFooterProps {
  data: VideoResponse;
  refetch: () => void;
}

const VideoFooter: React.FC<VideoFooterProps> = ({ data, refetch }) => {
  return (
    <div className={styles.vide_footer}>
      <VideoActionsContainer video={data.video} refetch={refetch} />
      <Subscribe
        avatar={data.video.channel.avatar}
        subscribers={data.video.channel.subscribers}
        name={data.video.channel.name}
        channelId={data.video.channel.id}
        refetch={refetch}
      />
      <Comment
        comments={data.comments}
        videoId={data.video.id}
        refetch={refetch}
      />
    </div>
  );
};

export default VideoFooter;
