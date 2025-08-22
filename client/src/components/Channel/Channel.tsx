import React from "react";
import { urlStatic } from "@src/vars";
import { useChannelContext } from "@src/pages/ChannelPage/ChannelPage";
import styles from "./channel.module.scss";
import ChannelAction from "./ChannelAction/ChannelAction";
import ChannelNav from "./ChannelNav/ChannelNav";
import Loading from "../Loading/Loading";

interface ChannelProps {
  refetch: () => void;
}

const Channel: React.FC<ChannelProps> = ({ refetch }) => {
  const data = useChannelContext();
  if (!data) return <Loading />;
  return (
    <div className={styles.channel}>
      <div className={styles.img_box}>
        <img
          src={urlStatic + data.background}
          alt="background"
          className={styles.img}
        />
      </div>
      <div className={styles.channel_wrapper}>
        <ChannelAction
          avatar={data.avatar}
          name={data.name}
          subscribers={data.subscribers}
          refetch={refetch}
        />
        <ChannelNav />
      </div>
    </div>
  );
};

export default Channel;
