import React from "react";
import styles from "./input.module.scss";

interface InputProps {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  type: string;
  // eslint-disable-next-line react/require-default-props
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

const Input: React.FC<InputProps> = ({
  value,
  setValue,
  placeholder,
  type,
  onKeyDown,
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      className={styles.input}
      onKeyDown={onKeyDown}
      data-testid="input"
    />
  );
};
export default Input;
