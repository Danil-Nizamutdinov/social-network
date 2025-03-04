import React from "react";
import ReactPlayer from "react-player";
import { urlStatic } from "@src/vars";
import styles from "./player.module.scss";

const Player: React.FC<{ url: string }> = ({ url }) => {
  return (
    <div className={styles.player_wrapper}>
      <ReactPlayer
        url={urlStatic + url}
        playing={false}
        className={styles.react_player}
        controls
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default Player;
