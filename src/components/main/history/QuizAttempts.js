import { React } from "react";
import { formatDate } from "../../../utils/generic-utils";

function QuizAttempts({ attempts }) {
  return (
    <div>
      <p>
        Hi there. Thanks for coming back. We notice you have attempted this quiz{" "}
        {attempts.length} times.
      </p>
      <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Date</th>
            <th>Score</th>
            <th>Total</th>
            <th>Quiz Category</th>
            <th>Difficulty Level</th>
          </tr>
        </thead>
        <tbody>
          {attempts.map((attempt, index) => {
            return (
              <tr key={attempt.quizAttemptedOn}>
                <td>{index + 1}</td>
                <td>{formatDate(attempt.quizAttemptedOn)}</td>
                <td> {attempt.quizScore} </td>
                <td>{attempt.questionCount}</td>
                <td>{attempt.quizCategory}</td>
                <td>{attempt.quizDifficultyLevel}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export { QuizAttempts };
