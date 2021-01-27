import React from "react";
import { Link } from "react-router-dom";

function History() {
  return (
    <section>
      <p>
        Hi there. We are delighted to have you here. This is where you can
        revisit your previous attempts at this quiz. 
      </p>
      <p>
          We notice you haven't attempted any quiz yet. Would you like to start?
      </p>
      <p> <Link to="/quiz"> Yes please. Right away </Link> </p>
      <p>  <Link  exact to="/"> No. Take me to the home page</Link></p>
    </section>
  );
}

export { History };
