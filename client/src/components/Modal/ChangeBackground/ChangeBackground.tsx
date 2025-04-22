import React, { useState } from "react";
import cross from "@src/assets/cross.png";
import ButtonImg from "@src/components/ButtonImg/ButtonImg";
import { useAppDispatch } from "@src/hooks/redux";
import { toggleFalse } from "@src/store/reducers/toggleSlice";
import Button from "@src/components/Button/Button";
import { useUpdateBackgroundMutation } from "@src/services/ChannelService";
import { useParams } from "react-router-dom";
import styles from "./change-back.module.scss";

const ChangeBackground: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const [updateBackground] = useUpdateBackgroundMutation();

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) setFile(files[0]);
  };

  const changeBackground = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (file) {
      const formData: FormData = new FormData();
      formData.append("channelId", `${id}`);
      formData.append("background", file);

      await updateBackground(formData);
      dispatch(toggleFalse());
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>изменить background</h1>
        <ButtonImg img={cross} handleOnClick={() => dispatch(toggleFalse())} />
      </div>
      <form onSubmit={changeBackground}>
        <div className={styles.form_item}>
          <input
            type="file"
            className={styles.file_input}
            onChange={onChangeFile}
          />
        </div>

        <div className={styles.form_item}>
          <Button
            text="Отмена"
            handleOnClick={() => dispatch(toggleFalse())}
            isSubmit={false}
          />
          <Button text="Добавить видео" handleOnClick={() => {}} isSubmit />
        </div>
      </form>
    </div>
  );
};

export default ChangeBackground;
