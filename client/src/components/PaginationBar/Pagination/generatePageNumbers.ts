const generatePageNumbers = (totalPages: number, page: number) => {
  const pages = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; ) {
      pages.push({ id: i, page: i });
      i += 1;
    }
  } else if (page < 4 || page > totalPages - 3) {
    if (page < 4) {
      for (let i = 1; i <= 4; ) {
        pages.push({ id: i, page: i });
        i += 1;
      }
      pages.push({ id: 1235313, page: "..." });
      pages.push({ id: totalPages, page: totalPages });
    } else if (page > totalPages - 3) {
      pages.push({ id: 1, page: 1 });
      pages.push({ id: 1235313, page: "..." });
      for (let i = totalPages - 3; i <= totalPages; ) {
        pages.push({ id: i, page: i });
        i += 1;
      }
    }
  } else {
    pages.push({ id: 1, page: 1 });
    pages.push({ id: 2, page: "..." });
    pages.push({ id: 3, page: page - 1 });
    pages.push({ id: 4, page });
    pages.push({ id: 7, page: page + 1 });
    pages.push({ id: 8, page: "..." });
    pages.push({ id: 9, page: totalPages });
  }
  return pages;
};

export default generatePageNumbers;
