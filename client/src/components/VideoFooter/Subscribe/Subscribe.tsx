import React from "react";
import Button from "@src/components/Button/Button";
import { urlStatic } from "@src/vars";
import { NavLink } from "react-router-dom";
import styles from "./subscribe.module.scss";

interface SubscribeProps {
  avatar: string;
  subscribers: number;
  name: string;
  channelId: number;
}

const Subscribe: React.FC<SubscribeProps> = ({
  avatar,
  subscribers,
  name,
  channelId,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.channel}>
        <div className={styles.img_box}>
          <NavLink to={`/channel/${channelId}`}>
            <img src={urlStatic + avatar} alt="avatar" />
          </NavLink>
        </div>
        <div className={styles.channel_info}>
          <h1 className={styles.title}>{name}</h1>
          <p className={styles.subtitle}>{subscribers} подписчиков</p>
        </div>
      </div>
      <Button text="Подписаться" handleOnClick={() => {}} isSubmit={false} />
    </div>
  );
};

export default Subscribe;
