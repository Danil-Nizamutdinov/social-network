import Button from "@src/components/Button/Button";
import React from "react";
import { apiUrlStatic } from "@src/api";
import { useRespondToRequestMutation } from "@src/services/contactService";
import { useAppDispatch } from "@src/hooks/redux";
import { toggleFalse } from "@src/store/reducers/toggleSlice";
import styles from "./incoming-item.module.scss";

interface Props {
  avatar: string;
  login: string;
  requestId: number;
  userId: number;
  type: string;
}

const RequestItem: React.FC<Props> = ({
  avatar,
  login,
  requestId,
  userId,
  type,
}) => {
  const [respondToRequest] = useRespondToRequestMutation();

  const dispatch = useAppDispatch();

  const handleAccept = () => {
    respondToRequest({ requestId, status: "accepted", userId });
    dispatch(toggleFalse());
  };
  const handleCancel = () => {
    respondToRequest({ requestId, status: "rejected", userId });
    dispatch(toggleFalse());
  };

  return (
    <div className={styles.item}>
      <div className={styles.info}>
        <img src={apiUrlStatic + avatar} alt="ava" />
        <span>{login}</span>
      </div>
      <div className={styles.action}>
        {type === "incoming" ? (
          <>
            <Button
              text="Принять"
              isSubmit={false}
              handleOnClick={handleAccept}
            />
            <Button
              text="Отклонить"
              isSubmit={false}
              handleOnClick={handleCancel}
            />
          </>
        ) : (
          <Button
            text="Отменить запрос"
            isSubmit={false}
            handleOnClick={() => {}}
          />
        )}
      </div>
    </div>
  );
};

export default RequestItem;
