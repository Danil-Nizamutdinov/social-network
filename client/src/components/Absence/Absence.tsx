import React from "react";
import s from "@src/assets/asda.svg";
import styles from "./absence.module.scss";

const Absence: React.FC = () => {
  return (
    <div className={styles.absence}>
      <div className={styles.absence_box}>
        <img src={s} className={styles.absence_img} alt="img" />
        <div>Тут еще ничего нет</div>
      </div>
    </div>
  );
};

export default Absence;
