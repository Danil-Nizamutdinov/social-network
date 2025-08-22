import React from "react";
import styles from "./paginationBar.module.scss";
import Pagination from "./Pagination/Pagination";

interface PaginationBarProps {
  totalPages: number;
  page: number;
  setPage: (value: number) => void;
}

const PaginationBar: React.FC<PaginationBarProps> = ({
  totalPages,
  page,
  setPage,
}) => {
  if (!totalPages) return <span />;
  return (
    <div className={styles.pagination}>
      <Pagination totalPages={totalPages} page={page} setPage={setPage} />
    </div>
  );
};

export default PaginationBar;
