import React from "react";
import Fade from "react-reveal/Fade";
import { computeScore } from "../../../utils/generic-utils";

function Statistics(props) {
  const { currentQuestionIndex, total, score } = props;
  return (
    <Fade>
      <p className="statistics">
        <span className="statistics__quiz-count">
          Question: {currentQuestionIndex + 1}
        </span>
        <span className="statistics__quiz-count"> Total: {total}</span>
        {score === null ? null : (
          <span className="statistics__quiz-count">
            {" "}
            Score: {computeScore(score, total)}%
          </span>
        )}
      </p>
    </Fade>
  );
}

export { Statistics };
