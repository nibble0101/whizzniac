import {
  getRandomInteger,
  parseQueryString,
  setCategoriesToLocalStorage,
  getCategoriesFromLocalStorage,
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
  test("Testing setCategoriesToLocalStorage and getCategoriesFromLocalStorage", () => {
    expect(typeof setCategoriesToLocalStorage === "function").toBe(true);
    expect(typeof getCategoriesFromLocalStorage === "function").toBe(true);
  });
});
