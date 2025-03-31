import ButtonImg from "@src/components/ButtonImg/ButtonImg";
import React from "react";
import arrow from "@src/assets/arrow.png";
import dislikeImg from "@src/assets/dislike.png";
import likeImg from "@src/assets/like.png";
import styles from "./video-actions.module.scss";

const VideoActions: React.FC<{ likeCounter: number }> = ({ likeCounter }) => {
  return (
    <div className={styles.actions_wrapper}>
      <div className={styles.action}>
        <ButtonImg img={likeImg} handleOnClick={() => {}} />
        <p className={styles.like_counter}>{likeCounter}</p>
        <ButtonImg img={dislikeImg} handleOnClick={() => {}} />
      </div>
      <div className={styles.action}>
        <ButtonImg img={arrow} handleOnClick={() => {}} />
        <p>Поделиться</p>
      </div>
    </div>
  );
};

export default VideoActions;
