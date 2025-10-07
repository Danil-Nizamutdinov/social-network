import React, { useState } from "react";
import ButtonImg from "@src/components/ButtonImg/ButtonImg";
import { useAppSelector } from "@src/hooks/redux";
import { useGetRequestQuery } from "@src/services/contactService";
import Loading from "@src/components/Loading/Loading";
import plus from "@src/assets/plus.png";
import { skipToken } from "@reduxjs/toolkit/query";
import styles from "./contact.module.scss";
import Contacts from "./Contacts/Contacts";
import AddContact from "./AddContact/AddContact";
import HeaderContact from "./HeaderContact/HeaderContact";
import FooterContact from "./FooterContact/FooterContact";
import RequestList from "./Incoming/RequestList";

const Contact: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("contacts");
  const userId = useAppSelector((state) => state.userReducer.user?.id);
  const { data, isLoading } = useGetRequestQuery(userId || skipToken);

  if (!userId) return <Loading />;

  return (
    <section className={styles.wrapper}>
      <HeaderContact
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <div className={styles.content}>
        <div className={styles.content_scroll}>
          {activeSection === "contacts" && <Contacts userId={userId} />}
          {activeSection === "add" && <AddContact userId={userId} />}
          {(activeSection === "incoming" || activeSection === "outgoing") && (
            <RequestList
              userId={userId}
              data={data}
              isLoading={isLoading}
              type={activeSection}
            />
          )}
        </div>
      </div>

      <span className={styles.add}>
        <ButtonImg img={plus} handleOnClick={() => setActiveSection("add")} />
      </span>
      <FooterContact setActiveSection={setActiveSection} />
    </section>
  );
};

export default Contact;
