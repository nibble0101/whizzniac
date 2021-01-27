import React from "react";
import { About } from "./About";
import { History } from "./History";
import { License } from "./License";
import { Categories } from "./categories/Categories";
import { Quiz} from "./quiz/Quiz";
import { Switch, Route } from "react-router-dom";
import "../../styles/Main.css";

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
        <Route path="/categories">
          <Categories />
        </Route>
        <Route path="/quiz/:category/:total/:difficulty">
           <Quiz />
        </Route>
      </Switch>
    </main>
  );
}

export { Main };
