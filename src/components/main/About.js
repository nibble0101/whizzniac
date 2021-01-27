import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <section>
      <p> Hi there, welcome to Whizzniac</p>
      <p>
        Would you like to start attempting quiz?
      </p>
      <p>
        <Link to="/categories"> Start Quiz </Link> 
      </p>
    </section>
  );
}

export { About };
