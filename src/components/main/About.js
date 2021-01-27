import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <section>
      <p> Hi there, welcome to Whizzniac</p>
      <p>
        We notice you have been here before. Would you like to start another
        quiz or continue from where you stopped?
      </p>
      <p>
        <Link to="quiz"> New quiz </Link> 
        <Link to="previous"> From where I stopped </Link>
      </p>
      <p>
        <Link to="/nowhere"> Start quiz </Link>
      </p>
    </section>
  );
}

export { About };
