import React, { useEffect, useState } from "react";
import { useLocation, useHistory, Prompt } from "react-router-dom";
import {
  parseQueryString,
  formatQuestions,
  isLastQuestionAttempted,
  shuffle,
} from "../../../utils/generic-utils";
import { Loader } from "../../loader/Loader";
import { Question } from "./Question";
import { Controls } from "./Controls";
import { EmitWarning } from "./EmitWarning";
import { Statistics } from "./Statistics";
import axios from "axios";
import Fade from "react-reveal/Fade";

const quizBaseUrl = "https://whizzniac-api.herokuapp.com";

function DisplayQuestion(props) {
  const { category, difficulty } = parseQueryString(useLocation().search);
  const [quiz, setQuiz] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [emitWarning, setEmitWarning] = useState(false);
  const [isError, setIsError] = useState(false);
  const history = useHistory();

  function nextQuestionClickHandler() {
    if (currentQuestionIndex + 1 === quiz.length) {
      return;
    }
    if (quiz[currentQuestionIndex].selectedAnswer === "") {
      setEmitWarning(true);
      return;
    }
    setCurrentQuestionIndex((currentQuestionIndex) => currentQuestionIndex + 1);
  }
  function previousQuestionClickHandler() {
    if (emitWarning === true) {
      setEmitWarning(false);
    }
    if (currentQuestionIndex === 0) return;
    setCurrentQuestionIndex((currentQuestionIndex) => currentQuestionIndex - 1);
  }
  function selectSolutionHandler(solution) {
    if (emitWarning === true) {
      setEmitWarning(false);
    }
    const clone = [...quiz];
    clone[currentQuestionIndex].selectedAnswer = solution;
    setQuiz(clone);
  }
  function displaySolutionsHandler() {
    history.push("/solutions", { quiz, difficulty });
  }
  useEffect(() => {
    const url = `${quizBaseUrl}/trivia?category=${category}&difficulty=${difficulty}`;
    async function fetchQuiz() {
      try {
        setIsFetchingData(true);
        const fetchedQuiz = (await axios.get(url)).data;
        const formattedQuiz = formatQuestions(fetchedQuiz);
        const shuffledQuiz = shuffle(formattedQuiz);
        setQuiz(shuffledQuiz);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsFetchingData(false);
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
  if (isError === true) {
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
