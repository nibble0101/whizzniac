import React from "react";
import { About } from "./About";
import { History } from "./History";
import { License } from "./License";

import { Switch, Route } from "react-router-dom";

function Main(params) {
  return (
    <main className="main">
      <Switch>
        <Route exact path="/">
          <About />
        </Route>
        <Route path="/history">
          <History />
        </Route>
        <Route path="/license">
          <License />
        </Route>
      </Switch>
    </main>
  );
}

export { Main };
