import React from "react";
import styles from "./textarea.module.scss";

interface Props {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
}

const Textarea: React.FC<Props> = ({ value, setValue, placeholder }) => {
  return (
    <textarea
      required
      placeholder={placeholder}
      className={styles.textarea}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default Textarea;
