import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import HamburgerMenu from "react-hamburger-menu";

function Navigation(props) {
  const [displayMenu, setDisplayMenu] = useState(false);

  function hamburgerMenuClicHandler() {
    const body = document.querySelector("body");
    body.classList.toggle("lock-body-scroll");
    setDisplayMenu((displayFlag) => !displayFlag);
  }
  return (
    <nav className="nav">
      <HamburgerMenu
        className="hamburger-menu-icon"
        width={18}
        height={15}
        strokeWidth={1}
        rotate={0}
        color="white"
        borderRadius={0}
        animationDuration={0.5}
        isOpen={displayMenu}
        menuClicked={hamburgerMenuClicHandler}
      />
      <ul
        className={`header__nav ${displayMenu ? "display__hamburger" : ""}`}
        onClick={hamburgerMenuClicHandler}
      >
        <li>
          <NavLink exact to="/" activeClassName="selected">
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/history" activeClassName="selected">
            History
          </NavLink>
        </li>
        <li>
          <NavLink to="/categories" activeClassName="selected">
            Quiz
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export { Navigation };
