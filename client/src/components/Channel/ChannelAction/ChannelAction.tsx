import ButtonBlue from "@src/components/ButtonBlue/ButtonBlue";
import { urlStatic } from "@src/vars";
import React from "react";
import { useParams } from "react-router-dom";
import Button from "@src/components/Button/Button";
import { useAppDispatch, useAppSelector } from "@src/hooks/redux";
import { toggle } from "@src/store/reducers/toggleSlice";
import { ActiveToggle } from "@src/types/main";
import styles from "./channel-action.module.scss";

interface ChannelActionProps {
  avatar: string;
  name: string;
  subscribers: number;
}

const ChannelAction: React.FC<ChannelActionProps> = ({
  avatar,
  name,
  subscribers,
}) => {
  const { id } = useParams();
  const user = useAppSelector((state) => state.userReducer.user);
  const dispatch = useAppDispatch();
  const isOwner = user?.id === Number(id);

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
          <Button
            text="Изменить фон"
            handleOnClick={() => dispatch(toggle(ActiveToggle.BACKGROUND))}
            isSubmit={false}
          />
          <Button
            text="Добавить видео"
            handleOnClick={() => dispatch(toggle(ActiveToggle.ADD_VIDEO))}
            isSubmit={false}
          />
        </div>
      ) : (
        <ButtonBlue
          text="Подписаться"
          isDisabled={false}
          handleOnClick={() => {}}
          isSubmit={false}
        />
      )}
    </div>
  );
};

export default ChannelAction;
