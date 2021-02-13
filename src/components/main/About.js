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
        fun. If you have ever been here before, navigate to the{" "}
        <a href="/history" className="link">
          history
        </a>{" "}
        page and check out your performance on previous attempts. If this is
        your first time here, start a new quiz session by clicking the button
        below. You will be taken to a page where you will select quiz category
        and difficulty level before attempting the questions.
      </p>
      <h2>Enjoy</h2>
      <p>
        <button onClick={startQuizHandler} className="button">
          Attempt Quiz
        </button>
      </p>
    </section>
  );
}

export { About };
