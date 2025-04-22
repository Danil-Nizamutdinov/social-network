import React from "react";
import Arrow from "@src/components/Arrow/Next";
import styles from "./pagination.module.scss";
import generatePageNumbers from "./generatePageNumbers";

interface PaginationBarProps2 {
  totalPages: number;
  page: number;
  setPage: (value: number) => void;
}

const Pagination: React.FC<PaginationBarProps2> = ({
  totalPages,
  page,
  setPage,
}) => {
  const pages = generatePageNumbers(totalPages, page);

  const changePage = (currentPage: number) => {
    setPage(currentPage);
  };

  const changePagePrevious = () => {
    setPage(page - 1);
  };

  const changePageNext = () => {
    setPage(page + 1);
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <button
            type="button"
            className={`${styles.button} ${styles.button_icon}`}
            onClick={changePagePrevious}
            disabled={page === 1}
          >
            <Arrow deg="135" />
          </button>
        </li>
        {pages.map((p) => (
          <li className={styles.li} key={p.id}>
            <button
              type="button"
              className={`${styles.button} ${page === p.page && styles.button_active} ${typeof p.page === "string" && styles.button_str}`}
              disabled={typeof p.page === "string"}
              onClick={() => changePage(Number(p.page))}
            >
              {p.page}
            </button>
          </li>
        ))}
        <li className={styles.li}>
          <button
            type="button"
            className={`${styles.button} ${styles.button_icon}`}
            onClick={changePageNext}
            disabled={page === totalPages}
          >
            <Arrow deg="-45" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
