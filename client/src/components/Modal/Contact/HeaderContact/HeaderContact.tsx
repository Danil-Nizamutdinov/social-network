import React from "react";
import { useAppDispatch } from "@src/hooks/redux";
import { toggleFalse } from "@src/store/reducers/toggleSlice";
import arrow from "@src/assets/left-arrow.png";
import cross from "@src/assets/cross.png";
import ButtonImg from "@src/components/ButtonImg/ButtonImg";
import styles from "./header-contact.module.scss";

interface Props {
  activeSection: string;
  setActiveSection: (arg: string) => void;
}

const HeaderContact: React.FC<Props> = ({
  activeSection,
  setActiveSection,
}) => {
  const dispatch = useAppDispatch();
  return (
    <header className={styles.header}>
      {activeSection !== "contacts" && (
        <ButtonImg
          img={arrow}
          handleOnClick={() => setActiveSection("contacts")}
        />
      )}
      <h1>
        {activeSection === "contacts" && "Контакты"}
        {activeSection === "add" && "Отправить запрос"}
        {activeSection === "incoming" && "Входящие"}
        {activeSection === "outgoing" && "Исходящие"}
      </h1>
      <ButtonImg img={cross} handleOnClick={() => dispatch(toggleFalse())} />
    </header>
  );
};

export default HeaderContact;
