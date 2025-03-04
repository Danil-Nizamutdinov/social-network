import React, { useState } from "react";
import arrowDown from "@src/assets/expand-arrow.png";
import ButtonImg from "@src/components/ButtonImg/ButtonImg";
import convertToReadableDate from "@src/helper/readableDate";
import styles from "./video-header.module.scss";

interface VideoHeaderProps {
  title: string;
  description: string;
  createdAt: string;
}

const VideoHeader: React.FC<VideoHeaderProps> = ({
  title,
  description,
  createdAt,
}) => {
  const [isDescription, setIsDescription] = useState<boolean>(false);

  return (
    <>
      <div className={styles.video_header}>
        <h1 className={styles.title}>{title}</h1>
        <ButtonImg
          img={arrowDown}
          handleOnClick={() => setIsDescription((prev) => !prev)}
        />
      </div>
      <p className={styles.views}>{convertToReadableDate(createdAt)}</p>
      <div
        className={`${styles.description} ${isDescription && styles.active}`}
      >
        {description}
      </div>
    </>
  );
};

export default VideoHeader;
