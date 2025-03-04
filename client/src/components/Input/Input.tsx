import React from "react";
import styles from "./input.module.scss";

interface InputProps {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  type: string;
}

const Input: React.FC<InputProps> = ({
  value,
  setValue,
  placeholder,
  type,
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      className={styles.input}
    />
  );
};
export default Input;
