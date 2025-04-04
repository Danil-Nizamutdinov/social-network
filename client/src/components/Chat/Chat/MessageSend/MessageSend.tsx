import React, { useState } from "react";
import { Socket } from "socket.io-client";
import { useParams } from "react-router-dom";
import ButtonImg from "@src/components/ButtonImg/ButtonImg";
import smile from "@src/assets/smile.png";
import send from "@src/assets/send.png";
import styles from "./message-send.module.scss";

interface Props {
  socket: Socket;
  userId: number;
}

const MessageSend: React.FC<Props> = ({ socket, userId }) => {
  const [message, setMessage] = useState<string>("");

  const { id } = useParams();

  const sendMessage = () => {
    socket.emit("sendMessage", { userId, chatId: id, content: message });
    setMessage("");
  };

  return (
    <div className={styles.message_send}>
      <input
        type="text"
        className={styles.input}
        placeholder="Написать сообщение..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <div className={styles.actons}>
        <img src={smile} alt="smile" />
        <span className={styles.send_img}>
          <ButtonImg img={send} handleOnClick={sendMessage} />
        </span>
      </div>
    </div>
  );
};

export default MessageSend;
