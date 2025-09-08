import React, { useState } from "react";
import cross from "@src/assets/cross.png";
import ButtonImg from "@src/components/ButtonImg/ButtonImg";
import { useAppDispatch, useAppSelector } from "@src/hooks/redux";
import { toggleFalse } from "@src/store/reducers/toggleSlice";
import Loading from "@src/components/Loading/Loading";
import arrow from "@src/assets/left-arrow.png";
import styles from "./contact.module.scss";
import Contacts from "./Contacts/Contacts";
import AddContact from "./AddContact/AddContact";
import Incoming from "./Incoming/Incoming";

const Contact: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("contacts");
  const userId = useAppSelector((state) => state.userReducer.user?.id);
  const dispatch = useAppDispatch();

  if (!userId) return <Loading />;
  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        {(activeSection === "add" || activeSection === "incoming") && (
          <ButtonImg
            img={arrow}
            handleOnClick={() => setActiveSection("contacts")}
          />
        )}
        <h1>
          {activeSection === "contacts" && "Контакты"}
          {activeSection === "add" && "Отправить запрос"}
          {activeSection === "incoming" && "Входящие"}
        </h1>
        <ButtonImg img={cross} handleOnClick={() => dispatch(toggleFalse())} />
      </header>

      <div className={styles.content}>
        {activeSection === "contacts" && <Contacts userId={userId} />}
        {activeSection === "add" && <AddContact userId={userId} />}
        {activeSection === "incoming" && <Incoming userId={userId} />}
      </div>

      <footer className={styles.footer}>
        <button type="button" onClick={() => setActiveSection("add")}>
          Добавить контакт
        </button>
        <button type="button" onClick={() => setActiveSection("incoming")}>
          Входящие
        </button>
      </footer>
    </section>
  );
};

export default Contact;
