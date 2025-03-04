import React, { useState } from "react";
import cross from "@src/assets/cross.png";
import ButtonImg from "@src/components/ButtonImg/ButtonImg";
import { useAppDispatch } from "@src/hooks/redux";
import { toggleFalse } from "@src/store/reducers/toggleSlice";
import Textarea from "@src/components/Textarea/Textarea";
import Button from "@src/components/Button/Button";
import styles from "./change-d.module.scss";

const ChangeDescription: React.FC = () => {
  const [description, setDescription] = useState<string>("");

  const dispatch = useAppDispatch();
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>изменить описание</h1>
        <ButtonImg img={cross} handleOnClick={() => dispatch(toggleFalse())} />
      </div>
      <form>
        <div className={styles.form_item}>
          <Textarea
            value={description}
            placeholder="Добавить описание"
            setValue={setDescription}
          />
        </div>
        <div className={styles.form_item}>
          <Button
            text="Отмена"
            handleOnClick={() => dispatch(toggleFalse())}
            isSubmit={false}
          />
          <Button text="Изменить описание" handleOnClick={() => {}} isSubmit />
        </div>
      </form>
    </div>
  );
};

export default ChangeDescription;
