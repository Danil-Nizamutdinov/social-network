import convertToReadableDate from "./readableDate";

describe("convertToReadableDate", () => {
  test("correctly converts ISO date to readable format (ru-RU)", () => {
    const isoDate = "2023-05-15T14:30:00Z"; // UTC
    const result = convertToReadableDate(isoDate);
    // В московском времени (UTC+3) дата остаётся 15.05.2023
    expect(result).toBe("15.05.2023");
  });

  test("returns only the date part (before comma)", () => {
    const isoDate = "2023-12-31T23:59:59Z";
    const result = convertToReadableDate(isoDate);
    // 01.01.2024, т.к. MSK = UTC+3 (переход на следующий день)
    expect(result).toBe("01.01.2024");
  });

  test('handles invalid date by returning "Invalid Date"', () => {
    const invalidDate = "not-a-date";
    const result = convertToReadableDate(invalidDate);
    // new Date('not-a-date') -> Invalid Date
    expect(result).toBe("Invalid Date");
  });

  test("works with different timezones (input remains UTC)", () => {
    const isoDate = "2024-01-01T00:00:00Z"; // UTC полночь
    const result = convertToReadableDate(isoDate);
    // В MSK (UTC+3) это 03:00, но дата остаётся 01.01.2024
    expect(result).toBe("01.01.2024");
  });
});
