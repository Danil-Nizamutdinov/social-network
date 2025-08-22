import { IMessage } from "@src/types/main";
import React, { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "@src/hooks/redux";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import Chat from "./Chat/Chat";
import Absence from "../Absence/Absence";
import Loading from "../Loading/Loading";

interface Props {
  login: string;
  chatId: string | undefined;
}

const ChatContainer: React.FC<Props> = ({ login, chatId }) => {
  const [messages, setMessages] = useState<IMessage[]>();
  const user = useAppSelector((state) => state.userReducer.user);
  const navigate = useNavigate();

  const socket = useMemo(
    () =>
      io("http://localhost:3000", {
        autoConnect: false,
        auth: {
          token: localStorage.getItem("token"),
        },
        query: {
          chatId,
        },
      }),
    [chatId]
  );

  useEffect(() => {
    function onMessage(data: any) {
      setMessages(data);
    }

    socket.connect();
    socket.emit("join", { login, chatId });
    socket.on("message", onMessage);
    socket.on("getMessages", onMessage);

    socket.on("connect_error", () => {
      navigate("/video");
    });

    return () => {
      socket.off("getMessages");
      socket.disconnect();
    };
  }, [login, chatId, socket, navigate]);

  if (!user) return <Loading />;
  if (!messages) return <Absence />;

  return <Chat messages={messages} userId={user.id} socket={socket} />;
};

export default ChatContainer;
