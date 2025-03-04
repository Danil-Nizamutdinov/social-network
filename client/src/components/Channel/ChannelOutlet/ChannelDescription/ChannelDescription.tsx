import Loading from "@src/components/Loading/Loading";
import { useChannelContext } from "@src/pages/ChannelPage/ChannelPage";
import React from "react";
import Absence from "@src/components/Absence/Absence";
import Button from "@src/components/Button/Button";
import { useAppDispatch, useAppSelector } from "@src/hooks/redux";
import { toggle } from "@src/store/reducers/toggleSlice";
import { ActiveToggle } from "@src/types/main";
import styles from "./channel-d.module.scss";

const ChannelDescription: React.FC = () => {
  const data = useChannelContext();

  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.userReducer.user);
  const isOwner = user?.id === data?.id;

  if (!data) return <Loading />;
  return (
    <div className={styles.description}>
      <div className={styles.description_wrapper}>
        {data.description ? <p>{data.description}</p> : <Absence />}
      </div>
      {isOwner && (
        <div className={styles.button}>
          <Button
            text="Изменить описание"
            handleOnClick={() => dispatch(toggle(ActiveToggle.DESCRIPTION))}
            isSubmit={false}
          />
        </div>
      )}
    </div>
  );
};

export default ChannelDescription;
