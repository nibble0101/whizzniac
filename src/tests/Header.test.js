import { render, screen } from "@testing-library/react";
import { Header } from "../components/header/Header";
// import { Navigation } from "../components/header/Navigation";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

// describe("render Navigation component", () => {
//   render(
//     <Router history={createMemoryHistory()}>
//       <Navigation />
//     </Router>
//   );
// });

describe("render header component", () => {
  render(
    <Router history={createMemoryHistory()}>
      <Header />
    </Router>
  );
  const linkElement = screen.getByText("About");
  it("expect to have a link with text About", () => {
    expect(linkElement).toBeInTheDocument();
  });
});
