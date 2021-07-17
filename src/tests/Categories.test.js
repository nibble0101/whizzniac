import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
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

const server = setupServer(
  rest.get(
    "https://whizzniac-api.herokuapp.com/categories",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(categories));
    }
  )
);

describe("Render Categories component correctly", () => {
  describe("Render loading indicator", () => {
    it("Expect to display loading indicator", () => {
      render(
        <Router history={createMemoryHistory()}>
          <Categories />
        </Router>
      );
      expect(screen.getByTestId("loader")).toBeInTheDocument();
    });
  });
  describe("Render categories from local storage", () => {
    beforeAll(() => {
      localStorage.setItem(
        "quizCategories",
        JSON.stringify({ dateSaved: Date.now(), categories })
      );
    });

    afterAll(() => {
      localStorage.removeItem("quizCategories");
    });
    it("Expect to render categories from local storage correctly", async () => {
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
  });

  describe("Render categories from server", () => {
    beforeAll(() => {
      server.listen();
    });

    afterAll(() => {
      server.close();
    });

    it("Expect to render categories from the server correctly", async () => {
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
  });
});
