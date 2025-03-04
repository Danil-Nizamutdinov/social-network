import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./channel-nav.module.scss";

const ChannelNav: React.FC = () => {
  return (
    <nav>
      <NavLink
        to="videos"
        className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ""}`
        }
      >
        Видео
      </NavLink>
      <NavLink
        to="description"
        className={({ isActive }) =>
          `${styles.link} ${isActive ? styles.active : ""}`
        }
      >
        О канеле
      </NavLink>
    </nav>
  );
};

export default ChannelNav;
