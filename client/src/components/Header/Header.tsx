import React, { useState } from "react";
import styles from "./header.module.scss";
import HeaderContent from "./HeaderContent/HeaderContent";
import HeaderSearch from "./HeaderSearch/HeaderSearch";

const Header: React.FC<{ url: string }> = ({ url }) => {
  const [isSearch, setIsSearch] = useState<boolean>(false);

  return (
    <header className={styles.header_wrapper}>
      <div className={styles.header}>
        <div className={styles.header_container}>
          {isSearch ? (
            <HeaderSearch setIsSearch={setIsSearch} url={url} />
          ) : (
            <HeaderContent setIsSearch={setIsSearch} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
