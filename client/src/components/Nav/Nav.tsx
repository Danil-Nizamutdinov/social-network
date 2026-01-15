import React from "react";
import { ActiveToggle, INavLink } from "@src/types/main";
import message from "@src/assets/message.png";
import video from "@src/assets/video.png";
import musical from "@src/assets/musical-note.png";
import chat from "@src/assets/chat-room.png";
import contact from "@src/assets/contact.png";
import { useAppDispatch } from "@src/hooks/redux";
import { toggle } from "@src/store/reducers/toggleSlice";
import styles from "./nav.module.scss";
import NavItem from "./NavItem/NavItem";

const navLinks: INavLink[] = [
  { to: "chats", img: message, name: "Сообщение" },
  { to: "video", img: video, name: "Видео" },
  { to: "musical", img: musical, name: "Музыка" },
  { to: "chat", img: chat, name: "Каналы" },
];

const Nav = () => {
  const dispatch = useAppDispatch();

  const handleContact = () => {
    dispatch(toggle(ActiveToggle.CONTACT));
  };

  return (
    <div className={styles.nav_wrapper}>
      <nav className={styles.nav}>
        <button
          className={styles.link_item}
          type="button"
          onClick={handleContact}
        >
          <img src={contact} alt={contact} />
          Контакты
        </button>
        {navLinks.map((link) => (
          <NavItem
            to={link.to}
            img={link.img}
            name={link.name}
            key={link.name}
          />
        ))}
      </nav>
    </div>
  );
};

export default Nav;
