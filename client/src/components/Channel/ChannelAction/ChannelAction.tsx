import { urlStatic } from "@src/vars";
import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@src/hooks/redux";
import styles from "./channel-action.module.scss";
import ChannelActionOwner from "./ChannelActionOwner/ChannelActionOwner";
import ChannelActionUser from "./ChannelActionUser/ChannelActionUser";

interface ChannelActionProps {
  avatar: string;
  name: string;
  subscribers: number;
  refetch: () => void;
}

const ChannelAction: React.FC<ChannelActionProps> = ({
  avatar,
  name,
  subscribers,
  refetch,
}) => {
  const { id } = useParams();
  const userId = useAppSelector((state) => state.userReducer.user?.id);
  const isOwner = userId === Number(id);

  return (
    <div className={styles.action}>
      <div className={styles.channel_info}>
        <img src={urlStatic + avatar} alt="avatar" className={styles.img} />
        <div className={styles.channel_info_text}>
          <h1>{name}</h1>
          <p>{subscribers} подписчиков</p>
        </div>
      </div>
      {isOwner ? (
        <div className={styles.actions_owner}>
          <ChannelActionOwner />
        </div>
      ) : (
        <ChannelActionUser
          userId={userId}
          channelId={Number(id)}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default ChannelAction;
