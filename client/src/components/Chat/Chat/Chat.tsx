import { IMessage } from "@src/types/main";
import React, { useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import Message from "./Message/Message";
import styles from "./chat.module.scss";
import MessageSend from "./MessageSend/MessageSend";

interface Props {
  messages: IMessage[];
  userId: number;
  socket: Socket;
}

const Chat: React.FC<Props> = ({ messages, userId, socket }) => {
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  const scrollDown = () => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scroll(
        0,
        endOfMessagesRef.current.scrollHeight -
          endOfMessagesRef.current.clientHeight
      );
    }
  };

  useEffect(() => {
    scrollDown();
  }, [messages]);

  return (
    <div className={styles.chat}>
      <div className={styles.messages} ref={endOfMessagesRef}>
        {messages.map((message: IMessage) => (
          <Message message={message} userId={userId} key={message.id} />
        ))}
      </div>
      <MessageSend socket={socket} userId={userId} />
    </div>
  );
};

export default Chat;
