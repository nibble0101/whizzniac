import React, { useEffect, useReducer } from "react";
import { useLocation, useHistory, Prompt } from "react-router-dom";
import {
  parseQueryString,
  formatQuestions,
  isLastQuestionAttempted,
  shuffle,
} from "../../../utils/generic-utils";

import {
  SET_QUIZ,
  SET_PREVIOUS_QUESTION_INDEX,
  SET_NEXT_QUESTION_INDEX,
  SET_FETCHING_INDICATOR,
  SET_WARNING_INDICATOR,
  SET_ERROR_INDICATOR,
  initialState,
  reducer,
} from "../../../reducer/quizReducer";
import { Loader } from "../../loader/Loader";
import { Question } from "./Question";
import { Controls } from "./Controls";
import { EmitWarning } from "./EmitWarning";
import { Statistics } from "./Statistics";
import axios from "axios";
import Fade from "react-reveal/Fade";

const quizBaseUrl = "https://whizzniac-api.herokuapp.com";

/**
 * Container component that fetch quiz for a specific category and
 * difficulty level
 *
 */

function DisplayQuestion() {
  const [
    { quiz, currentQuestionIndex, isFetchingData, emitWarning, hasError },
    dispatch,
  ] = useReducer(reducer, initialState);
  const { category, difficulty } = parseQueryString(useLocation().search);
  const history = useHistory();

  /**
   * Handler for next question button
   *
   */

  function nextQuestionClickHandler() {
    // If last question is reached, next question button is disabled
    if (currentQuestionIndex + 1 === quiz.length) {
      return;
    }
    // Can't go to next question before selecting a solution
    // Display warning if user attempts to do so
    if (quiz[currentQuestionIndex].selectedAnswer === "") {
      dispatch({ type: SET_WARNING_INDICATOR, emitWarning: true });
      return;
    }
    // No payload is dispatched for incrementing question index
    dispatch({ type: SET_NEXT_QUESTION_INDEX });
  }

  /**
   * Handler for previous question button
   *
   */

  function previousQuestionClickHandler() {
    // Remove warning text if warning is visible on screen
    if (emitWarning === true) {
      dispatch({ type: SET_WARNING_INDICATOR, emitWarning: false });
    }
    // If first question, previous question button is disabled
    if (currentQuestionIndex === 0) return;
    // No payload is dispatched for decrementing question index
    dispatch({ type: SET_PREVIOUS_QUESTION_INDEX });
  }

  /**
   * Set selected answer (solution) as value of
   * selectedAnswer property in quiz object
   * @param {string} solution
   */

  function selectSolutionHandler(solution) {
    // Remove warning text if warning is visible on screen
    if (emitWarning === true) {
      dispatch({ type: SET_WARNING_INDICATOR, emitWarning: false });
    }
    const clone = [...quiz];
    clone[currentQuestionIndex].selectedAnswer = solution;
    dispatch({ type: SET_QUIZ, quiz: clone });
  }

  /**
   * Handler for submitting solutions after attempting quiz
   *
   */

  function displaySolutionsHandler() {
    //Redirects to solutions endpoint to display solutions
    history.push("/solutions", { quiz, difficulty });
  }

  useEffect(() => {
    const url = `${quizBaseUrl}/trivia?category=${category}&difficulty=${difficulty}`;
    async function fetchQuiz() {
      try {
        dispatch({ type: SET_FETCHING_INDICATOR, isFetchingData: true });
        const fetchedQuiz = (await axios.get(url)).data;
        const formattedQuiz = formatQuestions(fetchedQuiz);
        // Randomize question order. If same category is attempted
        // more than once, each attempt should have different order
        // of questions from previous ones. Same applies to solutions
        const shuffledQuiz = shuffle(formattedQuiz);
        dispatch({ type: SET_QUIZ, quiz: shuffledQuiz });
      } catch (err) {
        dispatch({ type: SET_ERROR_INDICATOR, hasError: true });
      } finally {
        dispatch({ type: SET_FETCHING_INDICATOR, isFetchingData: false });
      }
    }
    fetchQuiz();
  }, [category, difficulty]);

  if (!category || !difficulty) {
    history.push("/error", {
      message: "Incorrect or non-existent quiz category or difficulty level",
    });
    return null;
  }
  if (hasError === true) {
    history.push("/error", { message: "Failed to fetch quiz" });
    return null;
  }
  if (isFetchingData === true || quiz.length === 0) {
    return <Loader />;
  }

  const lastQuestionHasBeenAttempted = isLastQuestionAttempted(
    quiz[quiz.length - 1]
  );
  return (
    <section className="quiz-wrapper">
      <Prompt
        when={!lastQuestionHasBeenAttempted}
        message="Are you sure you want to close this page? Your progress will not be saved"
      />
      <EmitWarning emitWarning={emitWarning} />
      <Statistics
        currentQuestionIndex={currentQuestionIndex}
        total={quiz.length}
        score={null}
      />
      <Fade>
        <Question
          selectSolutionHandler={selectSolutionHandler}
          question={quiz[currentQuestionIndex]}
          currentQuestionIndex={currentQuestionIndex}
          total={quiz.length}
        />
      </Fade>
      <Fade>
        <Controls
          nextQuestionClickHandler={nextQuestionClickHandler}
          previousQuestionClickHandler={previousQuestionClickHandler}
          currentQuestionIndex={currentQuestionIndex}
          displaySolutionsHandler={displaySolutionsHandler}
          total={quiz.length}
          lastQuestionHasBeenAttempted={lastQuestionHasBeenAttempted}
        />
      </Fade>
    </section>
  );
}

export { DisplayQuestion };
