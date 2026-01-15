import React from "react";
import styles from "./footer-contact.module.scss";

interface Props {
  setActiveSection: (arg: string) => void;
}

const FooterContact: React.FC<Props> = ({ setActiveSection }) => {
  return (
    <footer className={styles.footer}>
      <button type="button" onClick={() => setActiveSection("outgoing")}>
        исходящие
      </button>
      <button type="button" onClick={() => setActiveSection("incoming")}>
        Входящие
      </button>
    </footer>
  );
};

export default FooterContact;
