import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <section className="about-section">
      <h1> Hi there, welcome to Whizzniac</h1>
      <p>
        This is where education meets recreation. You will learn while having
        fun. If you have ever been here before, navigate to the{" "}
        <Link to="/history" className="link">
          history
        </Link>{" "}
        page and check out your performance on previous attempts. If this is
        your first time here, start a new quiz session by clicking the link
        below. You will be taken to a page where you will select quiz category
        and difficulty level before attempting the questions.
      </p>
      <h2>Enjoy</h2>
      <p>
        <Link to="/categories" className="link link--style-border">
          Attempt Quiz
        </Link>
      </p>
    </section>
  );
}

export { About };
