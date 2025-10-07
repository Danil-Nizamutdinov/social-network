import React from "react";
import ButtonImg from "@src/components/ButtonImg/ButtonImg";
import { useAppDispatch, useAppSelector } from "@src/hooks/redux";
import cross from "@src/assets/cross.png";
import del from "@src/assets/trash.png";
import block from "@src/assets/block-user.png";
import { toggleFalse } from "@src/store/reducers/toggleSlice";
import { urlStatic } from "@src/vars";
import { useDelContactMutation } from "@src/services/contactService";
import { Link } from "react-router-dom";
import styles from "./contact-info.module.scss";

const ContactInfo = () => {
  const contact = useAppSelector((state) => state.contactReducer);
  const userId = useAppSelector((state) => state.userReducer.user?.id);

  const [delContact] = useDelContactMutation();

  const dispatch = useAppDispatch();

  const handleDelContact = () => {
    if (userId && contact.contactId) {
      delContact({ userId, friendId: contact.contactId });
      dispatch(toggleFalse());
    }
  };

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <h1>Информация</h1>
        <ButtonImg img={cross} handleOnClick={() => dispatch(toggleFalse())} />
      </header>
      <div>
        <div className={`${styles.item} ${styles.img_wrapper}`}>
          <img src={urlStatic + contact.avatar} alt="" />
          <p className={`${styles.p}`}>{contact.login}</p>
        </div>
        <div className={`${styles.item}`}>
          <div>
            <p className={`${styles.p}`}>{contact.login}</p>
            <p className={styles.sublogin}>login</p>
            <Link
              to={`chats/${contact.chatId}`}
              onClick={() => dispatch(toggleFalse())}
              className={styles.link}
            >
              перейти в чат
            </Link>
          </div>
        </div>
        <div className={`${styles.item} ${styles.action}`}>
          <button
            type="button"
            className={styles.button}
            onClick={handleDelContact}
          >
            <img src={del} alt="img" />
            <p className={`${styles.p}`}>Удалить контакт</p>
          </button>
          <button type="button">
            <img src={block} alt="img" />
            <p className={`${styles.p}`}>Заблокировать</p>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
