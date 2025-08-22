import generatePageNumbers from "./generatePageNumbers";

describe("generatePageNumbers", () => {
  test("should return all pages when totalPages <= 7", () => {
    expect(generatePageNumbers(5, 1)).toEqual([
      { id: 1, page: 1 },
      { id: 2, page: 2 },
      { id: 3, page: 3 },
      { id: 4, page: 4 },
      { id: 5, page: 5 },
    ]);

    expect(generatePageNumbers(7, 3)).toEqual([
      { id: 1, page: 1 },
      { id: 2, page: 2 },
      { id: 3, page: 3 },
      { id: 4, page: 4 },
      { id: 5, page: 5 },
      { id: 6, page: 6 },
      { id: 7, page: 7 },
    ]);
  });

  test("should handle pages near the beginning (page < 4)", () => {
    expect(generatePageNumbers(10, 2)).toEqual([
      { id: 1, page: 1 },
      { id: 2, page: 2 },
      { id: 3, page: 3 },
      { id: 4, page: 4 },
      { id: 1235313, page: "..." },
      { id: 10, page: 10 },
    ]);
  });

  test("should handle pages near the end (page > totalPages - 3)", () => {
    expect(generatePageNumbers(15, 13)).toEqual([
      { id: 1, page: 1 },
      { id: 1235313, page: "..." },
      { id: 12, page: 12 },
      { id: 13, page: 13 },
      { id: 14, page: 14 },
      { id: 15, page: 15 },
    ]);
  });

  test("should handle middle pages (4 <= page <= totalPages - 3)", () => {
    expect(generatePageNumbers(20, 5)).toEqual([
      { id: 1, page: 1 },
      { id: 2, page: "..." },
      { id: 3, page: 4 },
      { id: 4, page: 5 },
      { id: 7, page: 6 },
      { id: 8, page: "..." },
      { id: 9, page: 20 },
    ]);

    expect(generatePageNumbers(100, 50)).toEqual([
      { id: 1, page: 1 },
      { id: 2, page: "..." },
      { id: 3, page: 49 },
      { id: 4, page: 50 },
      { id: 7, page: 51 },
      { id: 8, page: "..." },
      { id: 9, page: 100 },
    ]);
  });
});
