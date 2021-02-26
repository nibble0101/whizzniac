import { render, screen } from "@testing-library/react";
import { Logo } from "../components/header/Logo";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

describe("Render Logo component", () => {
  it("Expect element with test id 'logo-container' in the Logo component", () => {
    render(
      <Router history={createMemoryHistory()}>
        <Logo />
      </Router>
    );
    expect(screen.getByTestId("logo-container")).toBeInTheDocument();
  });
  it("Expect element with text 'Whizzniac' to be in the Logo component", () => {
    render(
      <Router history={createMemoryHistory()}>
        <Logo />
      </Router>
    );
    expect(screen.getByText(/Whizzniac/i)).toBeInTheDocument();
  });
});
