/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import Button from "@src/components/Button/Button";
import Input from "@src/components/Input/Input";
import { useAppDispatch } from "@src/hooks/redux";
import { toggleFalse } from "@src/store/reducers/toggleSlice";
import { useParams } from "react-router-dom";
import { useAddVideoMutation } from "@src/services/VideoService";
import Loading from "@src/components/Loading/Loading";
import Textarea from "@src/components/Textarea/Textarea";
import styles from "./add-video-f.module.scss";
import generateFormData from "./generateFormData";

const AddVideoForm: React.FC = () => {
  const [addVideo, { isLoading }] = useAddVideoMutation();

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const dispatch = useAppDispatch();
  const { id } = useParams();

  const onChangeVideoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) setVideoFile(files[0]);
  };

  const onChangeImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) setImgFile(files[0]);
  };

  const handleAddVideo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!videoFile || !imgFile || !id) return;

    const formData = generateFormData({
      channelId: Number(id),
      title,
      description,
      videoFile,
      imgFile,
    });
    await addVideo(formData);
    dispatch(toggleFalse());
  };

  if (isLoading) return <Loading />;

  return (
    <form onSubmit={handleAddVideo}>
      <div className={styles.form_item}>
        <label className={styles.label}> Video File</label>
        <input
          type="file"
          className={styles.file_input}
          onChange={onChangeVideoFile}
        />
      </div>
      <div className={styles.form_item}>
        <label className={styles.label}>Preview File</label>
        <input
          type="file"
          className={styles.file_input}
          onChange={onChangeImgFile}
        />
      </div>
      <div className={styles.form_item}>
        <label className={styles.label}>Title</label>
        <Input
          type="text"
          value={title}
          setValue={setTitle}
          placeholder="Enter video title"
        />
      </div>
      <div className={styles.form_item}>
        <label className={styles.label}>Description</label>
        <Textarea
          setValue={setDescription}
          value={description}
          placeholder="Enter video description"
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
  );
};

export default AddVideoForm;
