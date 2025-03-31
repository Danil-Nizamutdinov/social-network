import Button from "@src/components/Button/Button";
import Textarea from "@src/components/Textarea/Textarea";
import { useAppDispatch } from "@src/hooks/redux";
import { toggleFalse } from "@src/store/reducers/toggleSlice";
import React, { useEffect, useState } from "react";
import {
  useGetChannelQuery,
  useUpdateDescriptionMutation,
} from "@src/services/ChannelService";
import Loading from "@src/components/Loading/Loading";
import { useParams } from "react-router-dom";
import styles from "./change-d-form.module.scss";

const ChangeDescriptionForm: React.FC = () => {
  const [description, setDescription] = useState<string>("");

  const [updateDescription] = useUpdateDescriptionMutation();

  const { id } = useParams();
  const { data, isLoading } = useGetChannelQuery(
    { channelId: Number(id) },
    { skip: !id }
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data && data.description) {
      setDescription(data.description);
    } else {
      setDescription("");
    }
  }, [data, id]);

  if (isLoading) return <Loading />;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(toggleFalse());
    await updateDescription({ channelId: Number(id), description });
  };

  return (
    <form onSubmit={handleSubmit}>
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
  );
};

export default ChangeDescriptionForm;
