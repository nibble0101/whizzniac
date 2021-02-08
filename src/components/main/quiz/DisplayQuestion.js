import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  parseQueryString,
  formatQuestions,
} from "../../../utils/generic-utils";
import { Loader } from "../../loader/Loader";
import { Question } from "./Question";
import { Controls } from "./Controls";
import { EmitWarning } from "./EmitWarning";
import { Statistics} from "./Statistics";
import axios from "axios";
import Fade from "react-reveal/Fade";

const quizBaseUrl = "https://opentdb.com/api.php";


function DisplayQuestion(props) {
  const { category, total, difficulty } = parseQueryString(useLocation().search);
  const [quiz, setQuiz] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [emitWarning, setEmitWarning] = useState(false);
  const [isError, setIsError] = useState(false);
  const history = useHistory();

  function nextQuestionClickHandler() {
    if (
      currentQuestionIndex + 1 === parseInt(total) ||
      currentQuestionIndex === 49
    ) {
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
    history.push("/solutions", {quiz, difficulty})
  }
  useEffect(() => {
    let quizCount;
    if (parseInt(total) > 50) {
      quizCount = 50;
    } else {
      quizCount = parseInt(total);
    }
    const url = `${quizBaseUrl}?amount=${quizCount}&category=${category}`;
    async function fetchQuiz() {
      try {
        setIsFetchingData(true);
        const fetchedQuiz = (await axios.get(url)).data;
        const formattedQuiz = formatQuestions(fetchedQuiz.results);
        setQuiz((currentQuiz) => [...currentQuiz, ...formattedQuiz]);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsFetchingData(false);
      }
    }
    fetchQuiz();
  }, [category, total]);

  if(!category || !total || !difficulty){
    history.push("/error", {message: "Incorrect or non-existent quiz category or difficulty level"})
    return null;
  }
  if(isError === true){
    history.push("/error", {message: "Failed to fetch quiz"});
    return null;
  }
  if (isFetchingData === true || quiz.length === 0) {
    return <Loader />;
  }
  return (
    <section className="quiz-wrapper">
      <Statistics 
      currentQuestionIndex={currentQuestionIndex}
      total={total}
      />
      <EmitWarning emitWarning = {emitWarning}/>
      <Fade>
        <Question
          selectSolutionHandler={selectSolutionHandler}
          question={quiz[currentQuestionIndex]}
          currentQuestionIndex={currentQuestionIndex}
          total={parseInt(total)}
        />
      </Fade>
      <Fade>
        <Controls
          nextQuestionClickHandler={nextQuestionClickHandler}
          previousQuestionClickHandler={previousQuestionClickHandler}
          currentQuestionIndex={currentQuestionIndex}
          displaySolutionsHandler={displaySolutionsHandler}
          total={parseInt(total)}
        />
      </Fade>
    </section>
  );
}

export { DisplayQuestion };
