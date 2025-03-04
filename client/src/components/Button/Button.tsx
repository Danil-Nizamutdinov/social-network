import React from "react";
import styles from "./button.module.scss";

interface ButtonProps {
  text: string;
  handleOnClick: () => void;
  isSubmit: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, handleOnClick, isSubmit }) => {
  return (
    <button
      type={isSubmit ? "submit" : "button"}
      className={styles.button}
      onClick={handleOnClick}
    >
      {text}
    </button>
  );
};

export default Button;
