import React from "react";
import search from "@src/assets/search.png";
import ananim from "@src/assets/user.png";
import menu from "@src/assets/menu.png";
import useWindowWidth from "@src/hooks/useWindowWidth";
import { desktopWidth, urlStatic } from "@src/vars";
import { ActiveToggle } from "@src/types/main";
import { useAppDispatch, useAppSelector } from "@src/hooks/redux";
import { toggle, toggleFalse } from "@src/store/reducers/toggleSlice";
import styles from "./header.module.scss";
import ButtonImg from "../ButtonImg/ButtonImg";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.userReducer.isAuth);
  const ava = useAppSelector((state) => state.userReducer.user?.avatar);
  const activeToggle = useAppSelector(
    (state) => state.toggleReducer.activeToggle
  );

  const toggleMenu = () => {
    if (activeToggle === ActiveToggle.MENU) {
      dispatch(toggleFalse());
    } else {
      dispatch(toggle(ActiveToggle.MENU));
    }
  };

  const width = useWindowWidth();
  const isDesktop = width >= desktopWidth;
  return (
    <header className={styles.header_wrapper}>
      <div className={styles.header}>
        <div className={styles.header_container}>
          <div className={styles.header_item}>
            {!isDesktop && <ButtonImg img={menu} handleOnClick={toggleMenu} />}
            <span className={styles.last}>Logo</span>
          </div>
          <div className={styles.header_item}>
            <img src={search} alt="search" />
            <div className={styles.last}>
              {isAuth ? (
                <div className={styles.img_box}>
                  <ButtonImg
                    img={urlStatic + ava}
                    handleOnClick={() => dispatch(toggle(ActiveToggle.PROFILE))}
                  />
                </div>
              ) : (
                <ButtonImg
                  img={ananim}
                  handleOnClick={() => dispatch(toggle(ActiveToggle.AUTH))}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
