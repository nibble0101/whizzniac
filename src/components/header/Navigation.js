import React from "react";
import { NavLink } from "react-router-dom";

function Navigation(props) {
  return (
    <nav>
      <ul className="header__nav">
        <li>
          <NavLink exact to="/">About</NavLink>
        </li>
        <li>
          <NavLink to="/history">History</NavLink>
        </li>
        <li>
          <NavLink to="/license">License</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export { Navigation };
