import React from "react";
import Button from "@src/components/Button/Button";
import { urlStatic } from "@src/vars";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@src/hooks/redux";
import {
  useGetSubscriptionQuery,
  useSubscribeMutation,
  useUnsubscribeMutation,
} from "@src/services/ReactionService";
import { skipToken } from "@reduxjs/toolkit/query";
import { toggle } from "@src/store/reducers/toggleSlice";
import { ActiveToggle } from "@src/types/main";
import styles from "./subscribe.module.scss";

interface SubscribeProps {
  avatar: string;
  subscribers: number;
  name: string;
  channelId: number;
  refetch: () => void;
}

const Subscribe: React.FC<SubscribeProps> = ({
  avatar,
  subscribers,
  name,
  channelId,
  refetch,
}) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.userReducer.user?.id);
  const { data } = useGetSubscriptionQuery(
    userId && channelId ? { userId, channelId } : skipToken
  );
  const [subscribe] = useSubscribeMutation();
  const [unSubscribe] = useUnsubscribeMutation();

  const handleSubscribe = async () => {
    if (userId && channelId) {
      await subscribe({ userId, channelId });
      refetch();
    } else {
      dispatch(toggle(ActiveToggle.AUTH));
    }
  };

  const handleUnSubscribe = async () => {
    if (userId && channelId) {
      await unSubscribe({ userId, channelId });
      refetch();
    }
  };

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
      {data?.isSubscribe ? (
        <Button
          text="Вы подписаны"
          handleOnClick={handleUnSubscribe}
          isSubmit={false}
        />
      ) : (
        <Button
          text="Подписаться"
          handleOnClick={handleSubscribe}
          isSubmit={false}
        />
      )}
    </div>
  );
};

export default Subscribe;
