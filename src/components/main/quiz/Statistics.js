import React from "react";
import Fade from "react-reveal/Fade";

function Statistics(props) {
  const { currentQuestionIndex, total } = props;
  return (
    <Fade>
      <p className="statistics">
        <span className="statistics__quiz-count">
          Question: {currentQuestionIndex + 1}
        </span>
        <span className="statistics__quiz-count"> Total: {total}</span>
      </p>
    </Fade>
  );
}

export { Statistics };
