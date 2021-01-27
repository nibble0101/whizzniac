import React from "react";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";

function Header() {
  return (
    <header className="header">
      <Logo />
      <Navigation />
    </header>
  );
}

export { Header };
