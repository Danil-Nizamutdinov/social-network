import React, { useState } from "react";
import Arrow from "@src/components/Arrow/Next";
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
        <button onClick={() => setIsDescription((prev) => !prev)} type="button">
          <Arrow deg={isDescription ? "-135" : "45"} />
        </button>
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
