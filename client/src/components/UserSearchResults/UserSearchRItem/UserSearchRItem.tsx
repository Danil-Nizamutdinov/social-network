import { IUser } from "@src/types/main";
import React from "react";
import { urlStatic } from "@src/vars";
import Button from "@src/components/Button/Button";
import { useCreateChatMutation } from "@src/services/ChatService";
import { useAppSelector } from "@src/hooks/redux";
import { useNavigate } from "react-router-dom";
import styles from "./user-search-ri.module.scss";

const UserSearchRItem: React.FC<{ user: IUser }> = ({ user }) => {
  const [createChat] = useCreateChatMutation();
  const userId = useAppSelector((state) => state.userReducer.user?.id);
  const navigate = useNavigate();

  const handleCreateChat = () => {
    if (userId) {
      createChat({ user1Id: userId, user2Id: user.id })
        .unwrap()
        .then((res) => navigate(`/chats/${res.id}`));
    }
  };

  return (
    <div className={styles.user_item}>
      <div className={styles.user_info}>
        <img src={urlStatic + user.avatar} alt="ava" />
        <p>{user.login}</p>
      </div>
      <div>
        <Button
          text="начать чат"
          handleOnClick={handleCreateChat}
          isSubmit={false}
        />
      </div>
    </div>
  );
};

export default UserSearchRItem;
