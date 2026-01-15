import { useEffect, useMemo } from "react";
import { io } from "socket.io-client";

const useChatSocket = (chatId: string | undefined) => {
  const socket = useMemo(
    () =>
      io("http://localhost:3000/chat", {
        autoConnect: false,
        auth: { token: localStorage.getItem("token") },
        query: {
          chatId,
        },
      }),
    [chatId]
  );

  useEffect(() => {
    return () => {
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, [socket]);

  return socket;
};

export default useChatSocket;
