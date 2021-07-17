import { render, screen, waitFor } from "@testing-library/react";
import { Categories } from "../components/main/categories/Categories";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
const categories = [
  { id: 9, name: "General Knowledge" },
  { id: 10, name: "Entertainment: Books" },
];
// eslint-disable-next-line no-unused-vars
const difficultyLevelObject = [
  { id: 1000, name: "Mixed" },
  { id: 1001, name: "Easy" },
];

beforeAll(() => {
  localStorage.setItem(
    "quizCategories",
    JSON.stringify({ dateSaved: Date.now(), categories })
  );
});

afterAll(() => {
  localStorage.removeItem("quizCategories");
});

it("Expects to render Categories component correctly", async () => {
  render(
    <Router history={createMemoryHistory()}>
      <Categories />
    </Router>
  );
  await waitFor(() => {
    expect(
      screen.getByText("Select category", { exact: true })
    ).toBeInTheDocument();
  });
  expect(
    screen.getByText("Select difficulty", { exact: true })
  ).toBeInTheDocument();
  expect(
    screen.getByLabelText("Category", { selector: "select", exact: true })
  ).toBeInTheDocument();
  expect(
    screen.getByLabelText("Difficulty", { selector: "select", exact: true })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: "Start quiz", exact: true })
  ).toBeInTheDocument();
  expect(
    screen.getByText("General Knowledge", { exact: true })
  ).toBeInTheDocument();
  expect(
    screen.getByText("Entertainment: Books", { exact: true })
  ).toBeInTheDocument();
  expect(screen.getByText("Mixed", { exact: true })).toBeInTheDocument();
  expect(screen.getByText("Easy", { exact: true })).toBeInTheDocument();
});
