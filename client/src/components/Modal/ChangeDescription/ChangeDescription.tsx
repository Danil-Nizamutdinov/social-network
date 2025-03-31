import React from "react";
import cross from "@src/assets/cross.png";
import ButtonImg from "@src/components/ButtonImg/ButtonImg";
import { useAppDispatch } from "@src/hooks/redux";
import { toggleFalse } from "@src/store/reducers/toggleSlice";
import styles from "./change-d.module.scss";
import ChangeDescriptionForm from "./ChangeDescriptionForm/ChangeDescriptionForm";

const ChangeDescription: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>изменить описание</h1>
        <ButtonImg img={cross} handleOnClick={() => dispatch(toggleFalse())} />
      </div>
      <ChangeDescriptionForm />
    </div>
  );
};

export default ChangeDescription;
