import React from "react";
import { useHistory } from "react-router-dom";

function About() {
  const history = useHistory();
  const startQuizHandler = () => {
    history.push("/categories");
  };
  return (
    <section className="about-section">
      <h1> Hi there, welcome to Whizzniac</h1>
      <p>
        This is where education meets recreation. You will learn while having
        fun. If you have ever been here before, you can navigate to the history
        page and resume from where you stopped. Yes, that is how smart we are.
        We let you take a break in the middle of a quiz or close the app if you
        like and when you come come back, you start right from where you
        stopped. If this is your first time here, start a new quiz session by
        clicking the button below. You will be taken to a page where you will
        select quiz category and difficulty level before you start attempting
        the questions.
      </p>
      <h2>Enjoy</h2>
      <p>
        <button onClick={startQuizHandler} className="button">
          Next
        </button>
      </p>
    </section>
  );
}

export { About };
