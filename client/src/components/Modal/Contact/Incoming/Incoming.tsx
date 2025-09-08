import Absence from "@src/components/Absence/Absence";
import Loading from "@src/components/Loading/Loading";
import { useGetRequestQuery } from "@src/services/contactService";
import { IIncoming } from "@src/types/main";
import React from "react";
import IncomingItem from "./IncomingItem/IncomingItem";
import styles from "./incoming.module.scss";

interface Props {
  userId: number;
}

const Incoming: React.FC<Props> = ({ userId }) => {
  const { data, isLoading } = useGetRequestQuery(userId);
  if (isLoading) return <Loading />;
  if (!data) return <Absence />;
  return (
    <div className={styles.wrapper}>
      {data.incoming.length === 0 ? (
        <Absence />
      ) : (
        data.incoming.map((el: IIncoming) => (
          <IncomingItem
            avatar={el.User.avatar}
            login={el.User.login}
            requestId={el.id}
            userId={userId}
            key={el.id}
          />
        ))
      )}
    </div>
  );
};

export default Incoming;
