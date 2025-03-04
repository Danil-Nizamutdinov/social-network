import { useGetChatQuery } from "@src/services/ChatService";
import React from "react";
import { urlStatic } from "@src/vars";
import { useNavigate } from "react-router-dom";
import arrow from "@src/assets/left-arrow.png";
import trash from "@src/assets/trash.png";
import Loading from "../Loading/Loading";
import styles from "./header-chat.module.scss";
import ButtonImg from "../ButtonImg/ButtonImg";

interface Props {
  userId: number;
  chatId: number;
}

const HeaderChat: React.FC<Props> = ({ userId, chatId }) => {
  const { data: chat, isLoading } = useGetChatQuery({ userId, chatId });
  const navigate = useNavigate();
  if (isLoading || !chat) return <Loading />;
  return (
    <div className={styles.wrapper}>
      <div className={styles.header_message}>
        <ButtonImg img={arrow} handleOnClick={() => navigate(-1)} />
        <div className={styles.header_item}>
          <img
            src={urlStatic + chat.users[0].avatar}
            alt="ava"
            className={styles.ava}
          />
          <h1 className={styles.login}>{chat.users[0].login}</h1>
        </div>
        <button className={styles.header_item} type="button">
          <img src={trash} alt="del" />
          <p className={styles.button_text}>Удалить чат</p>
        </button>
      </div>
    </div>
  );
};

export default HeaderChat;
