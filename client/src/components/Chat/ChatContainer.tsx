import { IMessage } from "@src/types/main";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@src/hooks/redux";
import { io } from "socket.io-client";
import Chat from "./Chat/Chat";
import Absence from "../Absence/Absence";
import Loading from "../Loading/Loading";

interface Props {
  name: string;
  room: string | undefined;
}

const socket = io("http://localhost:3000", {
  autoConnect: false,
});

const ChatContainer: React.FC<Props> = ({ name, room }) => {
  const [messages, setMessages] = useState<IMessage[]>();
  const user = useAppSelector((state) => state.userReducer.user);
  useEffect(() => {
    function onMessage(data: any) {
      setMessages(data);
    }

    socket.connect();
    socket.emit("join", { name, room });
    socket.on("message", onMessage);
    socket.on("getMessages", onMessage);
    return () => {
      socket.off("getMessages");
      socket.disconnect();
    };
  }, [name, room]);

  if (!user) return <Loading />;
  if (!messages) return <Absence />;
  return <Chat messages={messages} userId={user.id} socket={socket} />;
};

export default ChatContainer;
