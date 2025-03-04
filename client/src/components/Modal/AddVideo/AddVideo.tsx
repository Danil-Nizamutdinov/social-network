import React from "react";
import cross from "@src/assets/cross.png";
import ButtonImg from "@src/components/ButtonImg/ButtonImg";
import { useAppDispatch } from "@src/hooks/redux";
import { toggleFalse } from "@src/store/reducers/toggleSlice";
import styles from "./add-video.module.scss";
import AddVideoForm from "./AddVideoForm/AddVideoForm";

const AddVideo: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Добавить видео</h1>
        <ButtonImg img={cross} handleOnClick={() => dispatch(toggleFalse())} />
      </div>
      <AddVideoForm />
    </div>
  );
};

export default AddVideo;
