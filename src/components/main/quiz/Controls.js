import React from "react";
import { isLastQuestion } from "../../../utils/generic-utils";

function Controls(props) {
  const {
    previousQuestionClickHandler,
    currentQuestionIndex,
    total,
    nextQuestionClickHandler,
    displaySolutionsHandler,
    lastQuestionHasBeenAttempted,
  } = props;
  const lastQuestionOnDisplay = isLastQuestion(currentQuestionIndex, total);
  return (
    <div>
      <button
        onClick={previousQuestionClickHandler}
        style={currentQuestionIndex === 0 ? { cursor: "not-allowed" } : null}
        className="button"
      >
        Previous
      </button>
      {lastQuestionHasBeenAttempted === true &&
      lastQuestionOnDisplay === true ? (
        <button onClick={displaySolutionsHandler} className="button">
          Display Solution
        </button>
      ) : (
        <button
          onClick={nextQuestionClickHandler}
          className="button"
          style={
            lastQuestionOnDisplay === true ? { cursor: "not-allowed" } : null
          }
        >
          Next
        </button>
      )}
    </div>
  );
}

export { Controls };
