import { render, screen } from "@testing-library/react";
import { App } from "../App";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

test("renders learn react link", () => {
  render(
    <Router history={createMemoryHistory()}>
      <App />
    </Router>
  );
  const linkElement = screen.getByText(/About/i);
  expect(linkElement).toBeInTheDocument();
});
