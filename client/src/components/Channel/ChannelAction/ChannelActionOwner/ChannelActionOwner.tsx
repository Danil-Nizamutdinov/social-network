import Button from "@src/components/Button/Button";
import { useAppDispatch } from "@src/hooks/redux";
import { toggle } from "@src/store/reducers/toggleSlice";
import { ActiveToggle } from "@src/types/main";
import React from "react";

const ChannelActionOwner: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <Button
        text="Изменить фон"
        handleOnClick={() => dispatch(toggle(ActiveToggle.BACKGROUND))}
        isSubmit={false}
      />
      <Button
        text="Добавить видео"
        handleOnClick={() => dispatch(toggle(ActiveToggle.ADD_VIDEO))}
        isSubmit={false}
      />
    </>
  );
};

export default ChannelActionOwner;
