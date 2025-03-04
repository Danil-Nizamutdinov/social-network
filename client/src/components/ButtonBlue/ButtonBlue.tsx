import React from "react";
import styles from "./button-blue.module.scss";

interface ButtonBlueProps {
  text: string;
  isDisabled: boolean;
  handleOnClick: () => void;
  isSubmit: boolean;
}

const ButtonBlue: React.FC<ButtonBlueProps> = ({
  text,
  isDisabled,
  handleOnClick,
  isSubmit,
}) => {
  return (
    <button
      type={isSubmit ? "submit" : "button"}
      className={styles.button}
      disabled={isDisabled}
      onClick={handleOnClick}
    >
      {text}
    </button>
  );
};

export default ButtonBlue;
