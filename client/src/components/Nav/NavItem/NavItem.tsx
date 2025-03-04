import React from "react";
import { useAppDispatch } from "@src/hooks/redux";
import { NavLink } from "react-router-dom";
import { toggleFalse } from "@src/store/reducers/toggleSlice";
import styles from "./nav-item.module.scss";

interface NavItemProps {
  to: string;
  img: string;
  name: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, img, name }) => {
  const dispatch = useAppDispatch();
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${styles.link} ${isActive ? styles.active : ""}`
      }
      onClick={() => dispatch(toggleFalse())}
    >
      <div className={styles.link_item}>
        <img src={img} alt={img} />
        {name}
      </div>
    </NavLink>
  );
};

export default NavItem;
