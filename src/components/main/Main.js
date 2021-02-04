import React from "react";
import { About } from "./About";
import { History } from "./History";
import { License } from "./License";
import { Categories } from "./categories/Categories";
import { DisplayQuestion } from "./quiz/DisplayQuestion";
import { SocialMedia } from "./SocialMedia";
import { Switch, Route } from "react-router-dom";
import { getHeaderHeight, getViewportHeight } from "../../utils/css-styles-utils";
import "../../styles/Main.css";

function Main() {
  return (
    <main className="main" style={{minHeight: `${getViewportHeight() - getHeaderHeight()}px`}}>
      <SocialMedia />
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
        <Route path="/quiz">
           <DisplayQuestion />
        </Route>
      </Switch>
    </main>
  );
}

export { Main };
