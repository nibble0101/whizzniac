import { render, screen, waitFor } from "@testing-library/react";
import { DisplayQuestion } from "../components/main/quiz/DisplayQuestion";
import { Error } from "../components/main/error/Error";
import { Router, Switch, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import { rest } from "msw";
import { server } from "../mocks/server";

describe("Render DisplayQuestion component correctly", () => {
  //   it("Expect to display loading indicator", () => {
  //     server.use(
  //       rest.get(
  //         "https://whizzniac-api.herokuapp.com/trivia",
  //         (req, res, ctx) => {
  //           return res.once(ctx.status(200), ctx.json([{}]));
  //         }
  //       )
  //     );
  //     const history = createMemoryHistory();
  //     history.push("/quiz?category=9&difficulty=easy");
  //     render(
  //       <Router history={history}>
  //         <DisplayQuestion />
  //       </Router>
  //     );
  //     expect(screen.getByTestId("loader")).toBeInTheDocument();
  //   });
  it("Expect to display  Error message if it fails to fetch quiz", async () => {
    server.use(
      rest.get(
        "https://whizzniac-api.herokuapp.com/trivia",
        (req, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );
    // Switching the if statements make the test pass
    // but fails when data fetch failure redirect
    // comes after query string error redirect
    // Investigate more
    const history = createMemoryHistory();
    history.push("/quiz?category=9&difficulty=easy");
    render(
      <Router history={history}>
        <DisplayQuestion />
        <Switch>
          <Route path="/error">
            <Error />
          </Route>
        </Switch>
      </Router>
    );
    await waitFor(() => {
      expect(
        screen.getByText("Failed to fetch quiz", { exact: true })
      ).toBeInTheDocument();
    });
  });
});
