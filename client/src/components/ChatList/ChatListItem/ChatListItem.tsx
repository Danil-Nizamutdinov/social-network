import convertToReadableDate from "@src/helper/readableDate";
import { IChat } from "@src/types/main";
import { urlStatic } from "@src/vars";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./chat-list-item.module.scss";

const ChatListItem: React.FC<{ chat: IChat }> = ({ chat }) => {
  return (
    <Link className={styles.link} to={`/chats/${chat.id}`}>
      <div className={styles.chat}>
        <img
          src={urlStatic + chat.users[0].avatar}
          alt="ava"
          className={styles.avatar}
        />
        <div>
          <h1 className={styles.name}>{chat.users[0].login}</h1>
          <p className={styles.last_message}>{chat.lastMessage}</p>
        </div>
      </div>
      <div className={styles.date}>{convertToReadableDate(chat.updatedAt)}</div>
    </Link>
  );
};

export default ChatListItem;
