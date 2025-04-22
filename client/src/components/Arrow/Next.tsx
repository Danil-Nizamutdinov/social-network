import React from "react";
import styles from "./next.module.scss";

const Arrow: React.FC<{ deg: string }> = ({ deg }) => {
  return (
    <i className={styles.arrow} style={{ transform: `rotate(${deg}deg)` }} />
  );
};

export default Arrow;
