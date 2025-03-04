import { IMessage } from "@src/types/main";
import React from "react";
import styles from "./message.module.scss";

interface Props {
  message: IMessage;
  userId: number;
}

const Message: React.FC<Props> = ({ message, userId }) => {
  return (
    <p
      className={
        message.userId === userId
          ? `${styles.message_active} ${styles.message_box}`
          : `${styles.message} ${styles.message_box}`
      }
    >
      {message.content}
    </p>
  );
};

export default Message;
