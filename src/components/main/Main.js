import React from "react";
import { About } from "./About";
import { History } from "./history/History";
import { License } from "./License";
import { Categories } from "./categories/Categories";
import { DisplayQuestion } from "./quiz/DisplayQuestion";
import { SocialMedia } from "./SocialMedia";
import { Solutions } from "./solutions/Solutions";
import { Error } from "./error/Error";
import { PageNotFound } from "./PageNotFound";
import { Switch, Route } from "react-router-dom";
import "../../styles/Main.css";

function Main() {
  return (
    <main className="main">
      <SocialMedia />
      <Switch>
        <Route exact path="/">
          <About />
        </Route>
        <Route exact path="/history">
          <History />
        </Route>
        <Route exact path="/license">
          <License />
        </Route>
        <Route exact path="/categories">
          <Categories />
        </Route>
        <Route exact path="/quiz">
          <DisplayQuestion />
        </Route>
        <Route exact path="/solutions">
          <Solutions />
        </Route>
        <Route exact path="/error">
          <Error />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </main>
  );
}

export { Main };
