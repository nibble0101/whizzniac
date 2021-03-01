import { render, screen } from "@testing-library/react";
import { Footer } from "../components/footer/Footer";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

it("Expects to render Footer component correctly", () => {
  render(
    <Router history={createMemoryHistory()}>
      <Footer />
    </Router>
  );
  expect(screen.getByText("WhizzNiac", { exact: true })).toBeInTheDocument();
  expect(screen.getByText("Data source", { exact: true })).toBeInTheDocument();
  expect(
    screen.getByText("You can follow me on", { exact: true })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: "Open Trivia Database API" })
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Joseph Mawa" })).toBeInTheDocument();
});
