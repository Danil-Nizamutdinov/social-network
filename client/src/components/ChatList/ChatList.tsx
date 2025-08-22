import { useGetChatsQuery } from "@src/services/ChatService";
import React from "react";
import { IChat } from "@src/types/main";
import Loading from "../Loading/Loading";
import ChatListItem from "./ChatListItem/ChatListItem";
import Absence from "../Absence/Absence";
import styles from "./chat-list.module.scss";

const ChatList: React.FC<{ userId: number }> = ({ userId }) => {
  const { data: chats, isLoading } = useGetChatsQuery(userId);
  if (isLoading) return <Loading />;
  if (!chats) return <Absence />;
  if (chats.length === 0) return <Absence />;
  return (
    <div className={styles.chat_list}>
      {chats.map((chat: IChat) => (
        <ChatListItem key={chat.id} chat={chat} />
      ))}
    </div>
  );
};

export default ChatList;
