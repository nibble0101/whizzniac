import React, { useState } from "react";
import { Statistics } from "../quiz/Statistics";
import { getPraisePhrase, getMotivationalPhrase } from "./phrases";
import { useLocation, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

function Solutions(props) {
  const { state } = useLocation();
  const history = useHistory();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  function nextQuestionClickHandler() {
    if (currentQuestionIndex + 1 === state.quiz.length) {
      return;
    }
    setCurrentQuestionIndex((currentQuestionIndex) => currentQuestionIndex + 1);
  }

  function previousQuestionClickHandler() {
    if (currentQuestionIndex === 0) {
      return;
    }
    setCurrentQuestionIndex((currentQuestionIndex) => currentQuestionIndex - 1);
  }
  if (!state) {
    history.push("/error", {
      message: "Sorry you can't have solutions without first attempting quiz",
    });
    return null;
  }
  const question = state.quiz[currentQuestionIndex];
  const isCorrectSolution = question.correctAnswer === question.selectedAnswer;
  let phrase;
  if (isCorrectSolution) {
    phrase = `You got it right. ${getPraisePhrase()}.`;
  } else {
    phrase = `You got it wrong. ${getMotivationalPhrase()}.`;
  }
  return (
    <div className="solutions-wrapper">
      <Statistics
        currentQuestionIndex={currentQuestionIndex}
        total={state.quiz.length}
        score={state.quizScore}
      />
      <form>
        <div>
          <h2>Question</h2>
          <p dangerouslySetInnerHTML={{ __html: question.question }} />
        </div>
        <hr />
        <div>
          <h2>Solutions</h2>
          <div>
            {question.possibleAnswersToSelectFrom.map((solution, index) => (
              <p key={Math.random()}>
                {solution === question.correctAnswer ? (
                  <span className="check-mark">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </span>
                ) : (
                  <span className="cross-mark">
                    <FontAwesomeIcon icon={faTimesCircle} />
                  </span>
                )}
                <label
                  className={
                    isCorrectSolution && solution === question.selectedAnswer
                      ? "correct-answer"
                      : null
                  }
                >
                  <input
                    type="radio"
                    name="solution"
                    value={solution}
                    readOnly={true}
                    checked={solution === question.selectedAnswer}
                  />
                  <span dangerouslySetInnerHTML={{ __html: solution }} />
                </label>
              </p>
            ))}
          </div>
        </div>
      </form>
      <hr />
      <p>{phrase}</p>
      <button className="button" onClick={previousQuestionClickHandler}>
        Previous Question
      </button>
      <button className="button" onClick={nextQuestionClickHandler}>
        Next Question
      </button>
    </div>
  );
}

export { Solutions };
