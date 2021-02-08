import { React } from "react";

function QuizAttempts({ attempts }) {
  return (
    <div>
      <p>
        Hi there. Thanks for coming back. Did you enjoy your previous quiz? We
        notice you have attempted this quiz {attempts.length} times.
      </p>
      <ul>
        {attempts.map((attempt) => {
          return (
            <div key={attempt.quizAttemptedOn}>
              <li> {attempt.quizAttemptedOn} </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export { QuizAttempts };
