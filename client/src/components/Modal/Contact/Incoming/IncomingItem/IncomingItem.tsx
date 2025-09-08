import Button from "@src/components/Button/Button";
import React from "react";
import { apiUrlStatic } from "@src/api";
import { useRespondToRequestMutation } from "@src/services/contactService";
import styles from "./incoming-item.module.scss";

interface Props {
  avatar: string;
  login: string;
  requestId: number;
  userId: number;
}

const IncomingItem: React.FC<Props> = ({
  avatar,
  login,
  requestId,
  userId,
}) => {
  const [respondToRequest] = useRespondToRequestMutation();

  const handleRespondToRequest = () => {
    respondToRequest({ requestId, status: "accepted", userId });
  };

  return (
    <div className={styles.item}>
      <div className={styles.info}>
        <img src={apiUrlStatic + avatar} alt="ava" />
        <span>{login}</span>
      </div>
      <div className={styles.action}>
        <Button
          text="Принять"
          isSubmit={false}
          handleOnClick={handleRespondToRequest}
        />
        {/* <Button text="Откланить" isSubmit={false} handleOnClick={() => {}} /> */}
      </div>
    </div>
  );
};

export default IncomingItem;
