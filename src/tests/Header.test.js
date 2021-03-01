import { render, screen } from "@testing-library/react";
import { Header } from "../components/header/Header";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

describe("Render Header component correctly", () => {
  render(
    <Router history={createMemoryHistory()}>
      <Header />
    </Router>
  );
  it("Expects all Navigation links to be present and have correct text", () => {
    expect(
      screen.getByRole("link", { exact: true, name: "About" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { exact: true, name: "History" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { exact: true, name: "Quiz" })
    ).toBeInTheDocument();
  });
});
