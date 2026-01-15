import Button from "@src/components/Button/Button";
import Input from "@src/components/Input/Input";
import { useSendFriendRequestMutation } from "@src/services/contactService";
import React, { useState } from "react";
import { useAppDispatch } from "@src/hooks/redux";
import { toggleFalse } from "@src/store/reducers/toggleSlice";
import styles from "./add-contact.module.scss";

interface Props {
  userId: number;
}

const AddContact: React.FC<Props> = ({ userId }) => {
  const [login, setLogin] = useState<string>("");
  const [sendFriendRequest] = useSendFriendRequestMutation();

  const dispatch = useAppDispatch();

  const handleOnClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendFriendRequest({ userId, login });
    dispatch(toggleFalse());
  };

  return (
    <form onSubmit={handleOnClick} className={styles.form}>
      <Input
        value={login}
        setValue={setLogin}
        placeholder="Login"
        type="text"
      />
      <div className={styles.wrapper_button}>
        <Button text="Отмена" handleOnClick={() => {}} isSubmit={false} />
        <Button text="Отправить запрос" handleOnClick={() => {}} isSubmit />
      </div>
    </form>
  );
};

export default AddContact;
