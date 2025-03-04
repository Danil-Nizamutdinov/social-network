import React from "react";
import { INavLink } from "@src/types/main";
import message from "@src/assets/message.png";
import video from "@src/assets/video.png";
import musical from "@src/assets/musical-note.png";
import chat from "@src/assets/chat-room.png";
import styles from "./nav.module.scss";
import NavItem from "./NavItem/NavItem";

const navLinks: INavLink[] = [
  { to: "chats", img: message, name: "Сообщение" },
  { to: "video", img: video, name: "Видео" },
  { to: "musical", img: musical, name: "Музыка" },
  { to: "chat", img: chat, name: "Каналы" },
];

const Nav = () => {
  return (
    <div className={styles.nav_wrapper}>
      <nav className={styles.nav}>
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
