/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ReactNode } from "react";
import { useAppDispatch } from "@src/hooks/redux";
import { toggleFalse } from "@src/store/reducers/toggleSlice";
import styles from "./modal.module.scss";

interface Children {
  children: ReactNode;
  isModal: boolean;
  isMenu: boolean;
}

const Modal: React.FC<Children> = ({ children, isModal, isMenu }) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className={`${styles.modal} ${isModal && styles.modal_active} ${isMenu && styles.modal_menu}`}
      onClick={() => dispatch(toggleFalse())}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};

export default Modal;
