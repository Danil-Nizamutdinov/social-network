import Absence from "@src/components/Absence/Absence";
import Loading from "@src/components/Loading/Loading";
import { ISendFriendRequestResponse } from "@src/types/main";
import React from "react";
import styles from "./incoming.module.scss";
import RequestItem from "./IncomingItem/RequestItem";

interface Props {
  userId: number;
  data: ISendFriendRequestResponse | undefined;
  isLoading: boolean;
  type: string;
}

const RequestList: React.FC<Props> = ({ userId, data, isLoading, type }) => {
  if (isLoading) return <Loading />;
  if (!data) return <Absence />;

  const requests = type === "incoming" ? data.incoming : data.outgoing;
  return (
    <div className={styles.wrapper}>
      {requests.length === 0 ? (
        <Absence />
      ) : (
        requests.map((el: any) => (
          <RequestItem
            avatar={el.User.avatar}
            login={el.User.login}
            requestId={el.id}
            userId={userId}
            key={el.id}
            type={type}
          />
        ))
      )}
    </div>
  );
};

export default RequestList;
