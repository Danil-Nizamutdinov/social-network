import React, { useState } from "react";
import searchImg from "@src/assets/search.png";
import arrow from "@src/assets/left-arrow.png";
import Input from "@src/components/Input/Input";
import ButtonImg from "@src/components/ButtonImg/ButtonImg";
import { useNavigate } from "react-router-dom";
import styles from "./header-s.module.scss";

interface HeaderSearchProps {
  setIsSearch: (val: boolean) => void;
  url: string;
}

const HeaderSearch: React.FC<HeaderSearchProps> = ({ setIsSearch, url }) => {
  const [text, setText] = useState<string>("");
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/${url}/results?search_query=${encodeURIComponent(text)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleNavigate();
    }
  };

  return (
    <>
      <ButtonImg img={arrow} handleOnClick={() => setIsSearch(false)} />

      <div className={styles.header_search}>
        <Input
          value={text}
          setValue={setText}
          placeholder="Поиск"
          type="text"
          onKeyDown={handleKeyDown}
        />
        <ButtonImg img={searchImg} handleOnClick={handleNavigate} />
      </div>
    </>
  );
};

export default HeaderSearch;
