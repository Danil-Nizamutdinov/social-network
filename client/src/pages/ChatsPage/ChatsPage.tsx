import ChatList from "@src/components/ChatList/ChatList";
import Header from "@src/components/Header/Header";
import Loading from "@src/components/Loading/Loading";
import { useAppSelector } from "@src/hooks/redux";
import React from "react";

const ChatsPage: React.FC = () => {
  const user = useAppSelector((state) => state.userReducer.user);

  if (!user) return <Loading />;

  return (
    <div>
      <Header />
      <ChatList userId={user.id} />
    </div>
  );
};

export default ChatsPage;
