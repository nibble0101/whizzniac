import {
  render,
  screen,
  waitFor,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Categories } from "../components/main/categories/Categories";
import { Error } from "../components/main/error/Error";
import { Router, Switch, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import { rest } from "msw";
import { server } from "../mocks/server";
const categories = [
  { id: 9, name: "General Knowledge" },
  { id: 10, name: "Entertainment: Books" },
];

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
  describe("Render Error component if fail to load categories", () => {
    it("Expect to display error message if loading data fails", async () => {
      server.use(
        rest.get(
          "https://whizzniac-api.herokuapp.com/categories",
          (req, res, ctx) => {
            return res(ctx.status(500));
          }
        )
      );
      render(
        <Router history={createMemoryHistory()}>
          <Categories />
          <Switch>
            <Route path="/error">
              <Error />
            </Route>
          </Switch>
        </Router>
      );
      await waitForElementToBeRemoved(() => screen.queryByTestId("loader"));
      await waitFor(() => {
        expect(
          screen.getByText("Failed to fetch Trivia categories")
        ).toBeInTheDocument();
      });
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

  describe("Select Categories and Difficulty level options", () => {
    beforeAll(() => {
      localStorage.setItem(
        "quizCategories",
        JSON.stringify({ dateSaved: Date.now(), categories })
      );
    });

    afterAll(() => {
      localStorage.removeItem("quizCategories");
    });
    it("Expect to select categories correctly", async () => {
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
      fireEvent.change(screen.getByLabelText("Category"), {
        target: { value: "Entertainment: Books" },
      });
      const categoryOptions = screen.getAllByTestId("Category-Option");
      expect(categoryOptions[0].selected).toBeFalsy();
      expect(categoryOptions[1].selected).toBeTruthy();
    });

    it("Expect to select difficulty level correctly", async () => {
      render(
        <Router history={createMemoryHistory()}>
          <Categories />
        </Router>
      );
      await waitFor(() => {
        expect(
          screen.getByText("Select difficulty", { exact: true })
        ).toBeInTheDocument();
      });
      fireEvent.change(screen.getByLabelText("Difficulty"), {
        target: { value: "Hard" },
      });
      const categoryOptions = screen.getAllByTestId("Difficulty-Option");
      expect(categoryOptions[0].selected).toBeFalsy();
      expect(categoryOptions[1].selected).toBeFalsy();
      expect(categoryOptions[2].selected).toBeFalsy();
      expect(categoryOptions[3].selected).toBeTruthy();
    });
  });
});
