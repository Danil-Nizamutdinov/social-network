import Absence from "@src/components/Absence/Absence";
import Loading from "@src/components/Loading/Loading";
import { useGetContactsQuery } from "@src/services/contactService";
import React from "react";
import search from "@src/assets/search.png";
import ContactsItem from "./ContactsItem/ContactsItem";
import styles from "./contacts.module.scss";

interface Props {
  userId: number;
}

const Contacts: React.FC<Props> = ({ userId }) => {
  const { data, isLoading } = useGetContactsQuery(userId);
  if (isLoading) return <Loading />;
  if (!data) return <Absence />;
  return (
    <div className={styles.contacts}>
      {data.length === 0 ? (
        <Absence />
      ) : (
        <>
          <div className={styles.wrapper_input}>
            <img src={search} alt="search" />
            <input type="text" placeholder="Поиск..." />
          </div>
          {data.map((el) => (
            <ContactsItem
              avatar={el.Friend.avatar}
              login={el.Friend.login}
              contactId={el.Friend.id}
              email={el.Friend.email}
              chatId={el.chatId}
              key={el.id}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Contacts;
