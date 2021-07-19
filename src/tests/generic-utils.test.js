import {
  getRandomInteger,
  parseQueryString,
  setCategoriesToLocalStorage,
  getCategoriesFromLocalStorage,
  computeScore,
  formatDate,
} from "../utils/generic-utils";

describe("Testing utility functions", () => {
  test("Tesing getRandomInteger", () => {
    const randomInteger = getRandomInteger(0, 10);
    expect(typeof getRandomInteger === "function").toBe(true);
    expect(Number.isInteger(randomInteger)).toBe(true);
    expect(randomInteger >= 0 && randomInteger <= 10).toBe(true);
  });
  test("Testing parseQueryString", () => {
    const parsedQueryStr = parseQueryString("?category=12");
    expect(typeof parseQueryString === "function").toBe(true);
    expect(parsedQueryStr).toEqual({ category: "12" });
  });
  test("Testing setCategoriesToLocalStorage", () => {
    setCategoriesToLocalStorage("testing", { a: 1, b: 2 });
    expect(typeof setCategoriesToLocalStorage === "function").toBe(true);
    expect(JSON.parse(localStorage.getItem("testing"))).toEqual({ a: 1, b: 2 });
    localStorage.removeItem("testing");
  });
  test("Testing getCategoriesFromLocalStorage", () => {
    const oneDay = 1 * 24 * 60 * 60 * 1000; // ms
    const now = Date.now();
    localStorage.setItem(
      "savedAfterOneWeek",
      JSON.stringify({
        dateSaved: now - 8 * oneDay,
        categories: [{ a: 1 }],
      })
    );
    localStorage.setItem(
      "savedWithinOneWeek",
      JSON.stringify({
        dateSaved: now,
        categories: [{ a: 1 }],
      })
    );

    expect(typeof getCategoriesFromLocalStorage === "function").toBe(true);
    expect(getCategoriesFromLocalStorage("nonExistentKey")).toEqual([]);
    expect(getCategoriesFromLocalStorage("savedAfterOneWeek")).toEqual([]);
    expect(getCategoriesFromLocalStorage("savedWithinOneWeek")).toEqual([
      { a: 1 },
    ]);
    localStorage.removeItem("savedAfterOneWeek");
    localStorage.removeItem("savedWithinOneWeek");
  });
  test("Testing computSecore", () => {
    expect(typeof computeScore === "function").toBe(true);
    expect(computeScore(1, 3)).toEqual(33);
    expect(computeScore(6, 9)).toEqual(66);
    expect(computeScore(20, 27)).toEqual(74);
  });
  test("Testing formatDate", () => {
    expect(typeof formatDate === "function").toBe(true);
    expect(typeof formatDate(1626713105034) === "string").toBe(true);
    expect(formatDate(1626713105034)).toEqual("Jul, 19 2021");
    expect(formatDate(1628615525699)).toEqual("Aug, 10 2021");
  });
});
