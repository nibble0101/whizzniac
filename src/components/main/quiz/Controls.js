import React from "react";

function Controls(props) {
  const {
    previousQuestionClickHandler,
    currentQuestionIndex,
    total,
    nextQuestionClickHandler,
  } = props;
  const isLastQuestion =
    currentQuestionIndex + 1 === total || currentQuestionIndex === 49;
  return (
    <div>
      <button
        onClick={previousQuestionClickHandler}
        style={currentQuestionIndex === 0 ? { cursor: "not-allowed" } : null}
        className="button"
      >
        Previous
      </button>
      {isLastQuestion === true ? (
        <button
          onClick={() => console.log("Display solution")}
          className="button"
        >
         Display Solution
        </button>
      ) : (
        <button onClick={nextQuestionClickHandler} className="button">
          Next
        </button>
      )}
    </div>
  );
}

export { Controls };
