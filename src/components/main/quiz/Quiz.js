import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  parseQueryString,
  formatQuestions
} from "../../../utils/generic-utils";
import { Loader } from "../../loader/Loader";
import { Question } from "./Question";
import axios from "axios";

const quizBaseUrl = "https://opentdb.com/api.php";

function Quiz(props) {
  const { category, total} = parseQueryString(
    useLocation().search
  );
  const [quiz, setQuiz] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFetchingData, setIsFetchingData] = useState(false);
  

  function nextQuestionClickHandler() {
    if(currentQuestionIndex + 1 === parseInt(total) || currentQuestionIndex === 49){
      return;
    }
    if(quiz[currentQuestionIndex].selectedAnswer === ""){
      alert("Please select solution");
      return;
    } 
    setCurrentQuestionIndex((currentQuestionIndex) => currentQuestionIndex + 1);
  }
  function previousQuestionClickHandler() {
    if (currentQuestionIndex === 0) return;
    setCurrentQuestionIndex((currentQuestionIndex) => currentQuestionIndex - 1);
  }
  function selectSolutionHandler(solution) {
    const clone = [...quiz];
    clone[currentQuestionIndex].selectedAnswer = solution;
    setQuiz(clone);
  }
  useEffect(() => {
    let quizCount;
    if(parseInt(total) > 50){
      quizCount = 50;
    }else{
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
        console.log("An error has occurred...");
      } finally {
        setIsFetchingData(false);
      }
    }
    fetchQuiz();
  }, [category, total]);
  if (isFetchingData === true || quiz.length === 0) {
    return <Loader />;
  }
  console.log(quiz[currentQuestionIndex].selectedAnswer);
  return (
    <section className="quiz-wrapper">
      <Question
        selectSolutionHandler={selectSolutionHandler}
        question={quiz[currentQuestionIndex]}
        currentQuestionIndex={currentQuestionIndex}
        total={parseInt(total)}
      />
      <div>
        {currentQuestionIndex === 0 ? null : (
          <button onClick={previousQuestionClickHandler}>Previous</button>
        )}
        {currentQuestionIndex + 1 === parseInt(total) ? null : (
          <button onClick={nextQuestionClickHandler}> Next </button>
        )}
      </div>
    </section>
  );
}

export { Quiz };
