import React from "react";
import styles from "./contacts-item.module.scss";
import { apiUrlStatic } from "@src/api";

interface Props {
  avatar: string;
  login: string;
}

const ContactsItem: React.FC<Props> = ({ avatar, login }) => {
  return (
    <div className={styles.item}>
      <img src={apiUrlStatic + avatar} alt="ava" />
      <span>{login}</span>
    </div>
  );
};

export default ContactsItem;
