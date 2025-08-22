import ChatContainer from "@src/components/Chat/ChatContainer";
import Header from "@src/components/Header/Header";
import HeaderChat from "@src/components/HeaderChat/HeaderChat";
import Loading from "@src/components/Loading/Loading";
import { useAppSelector } from "@src/hooks/redux";
import useWindowWidth from "@src/hooks/useWindowWidth";
import { desktopWidth } from "@src/vars";
import React from "react";
import { useParams } from "react-router-dom";

const ChatPage: React.FC = () => {
  const { id } = useParams();
  const user = useAppSelector((state) => state.userReducer.user);
  const width = useWindowWidth();
  const isDesktop = width >= desktopWidth;
  if (!user) return <Loading />;
  return (
    <div>
      {isDesktop && <Header url="chats" />}
      <HeaderChat userId={user.id} chatId={Number(id)} />
      <ChatContainer login={user.login} chatId={id} />
    </div>
  );
};

export default ChatPage;
