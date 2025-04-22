import React from "react";
import { useAppDispatch, useAppSelector } from "@src/hooks/redux";
import useWindowWidth from "@src/hooks/useWindowWidth";
import { toggle, toggleFalse } from "@src/store/reducers/toggleSlice";
import { ActiveToggle } from "@src/types/main";
import { desktopWidth, urlStatic } from "@src/vars";
import ButtonImg from "@src/components/ButtonImg/ButtonImg";
import search from "@src/assets/search.png";
import ananim from "@src/assets/user.png";
import menu from "@src/assets/menu.png";
import styles from "./header-c.module.scss";

interface HeaderContentProps {
  setIsSearch: (val: boolean) => void;
}

const HeaderContent: React.FC<HeaderContentProps> = ({ setIsSearch }) => {
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
    <>
      <div className={styles.header_item}>
        {!isDesktop && <ButtonImg img={menu} handleOnClick={toggleMenu} />}
        <span className={styles.last}>Logo</span>
      </div>
      <div className={styles.header_item}>
        <ButtonImg img={search} handleOnClick={() => setIsSearch(true)} />
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
    </>
  );
};

export default HeaderContent;
