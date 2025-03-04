import ButtonImg from "@src/components/ButtonImg/ButtonImg";
import React from "react";
import arrow from "@src/assets/arrow.png";
import dislikeImg from "@src/assets/dislike.png";
import likeImg from "@src/assets/like.png";
import styles from "./video-actions.module.scss";

interface VideoActionsProps {
  like: number;
  dislike: number;
}

const VideoActions: React.FC<VideoActionsProps> = ({ like, dislike }) => {
  return (
    <div className={styles.actions_wrapper}>
      <div className={styles.action}>
        <ButtonImg img={likeImg} handleOnClick={() => {}} />
        <p>{like}</p>
      </div>
      <div className={styles.action}>
        <ButtonImg img={dislikeImg} handleOnClick={() => {}} />
        <p>{dislike}</p>
      </div>
      <div className={styles.action}>
        <ButtonImg img={arrow} handleOnClick={() => {}} />
        <p>Поделиться</p>
      </div>
    </div>
  );
};

export default VideoActions;
