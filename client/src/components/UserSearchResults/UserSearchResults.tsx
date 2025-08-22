import { useGetUsersQuery } from "@src/services/ChatService";
import React from "react";
import { IUser } from "@src/types/main";
import Loading from "../Loading/Loading";
import UserSearchRItem from "./UserSearchRItem/UserSearchRItem";
import styles from "./user-search-r.module.scss";
import Absence from "../Absence/Absence";

const UserSearchResults: React.FC<{ searchQuery: string }> = ({
  searchQuery,
}) => {
  const { data, isLoading } = useGetUsersQuery(searchQuery);

  if (isLoading) return <Loading />;
  if (data?.length === 0) return <Absence />;
  return (
    <div className={styles.user_list}>
      {data?.map((user: IUser) => (
        <UserSearchRItem user={user} key={user.id} />
      ))}
    </div>
  );
};

export default UserSearchResults;
