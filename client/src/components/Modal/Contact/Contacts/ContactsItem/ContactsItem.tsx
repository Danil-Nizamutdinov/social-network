import React from "react";
import { apiUrlStatic } from "@src/api";
import { useAppDispatch } from "@src/hooks/redux";
import { toggle } from "@src/store/reducers/toggleSlice";
import { ActiveToggle } from "@src/types/main";
import { setContact } from "@src/store/reducers/contactSlice";
import styles from "./contacts-item.module.scss";

interface Props {
  avatar: string;
  login: string;
  contactId: number;
  chatId: number;
  email: string;
}

const ContactsItem: React.FC<Props> = ({
  avatar,
  login,
  contactId,
  email,
  chatId,
}) => {
  const dispatch = useAppDispatch();

  const handleContact = () => {
    dispatch(setContact({ login, contactId, avatar, email, chatId }));
    dispatch(toggle(ActiveToggle.CONTACT_INFO));
  };

  return (
    <button className={styles.item} type="button" onClick={handleContact}>
      <img src={apiUrlStatic + avatar} alt="ava" />
      <span>{login}</span>
    </button>
  );
};

export default ContactsItem;
