const convertToReadableDate = (date: string): string => {
  const readableDate = new Date(date).toLocaleString("ru-RU", {
    timeZone: "Europe/Moscow",
  });
  return readableDate.split(",")[0];
};

export default convertToReadableDate;
