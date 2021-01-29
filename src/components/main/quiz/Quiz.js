import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import {
  parseQueryString,
  getQuizCountForEachApiRequest,
} from "../../../utils/generic-utils";
import { Loader } from "../../loader/Loader";
import { Question } from "./Question";
import axios from "axios";

const quizBaseUrl = "https://opentdb.com/api.php";

function Quiz(props) {
  const { category, total, difficulty } = parseQueryString(
    useLocation().search
  );
  const [quiz, setQuiz] = useState([]);
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const quizCountForEachApiRequest = useMemo(
    () => getQuizCountForEachApiRequest(parseInt(total)),
    [total]
  );

  const currentBatchQuizCount = quizCountForEachApiRequest[currentBatchIndex];
  console.log(difficulty);
  function nextQuestionClickHandler() {
    const lastQuizIndex = quiz.length - 1;
    if (currentQuestionIndex + 1 === lastQuizIndex) {
      const lastQuizBatchArrayIndex = quizCountForEachApiRequest.length - 1;
      if (currentBatchIndex === lastQuizBatchArrayIndex) {
        setCurrentQuestionIndex(
          (currentQuestionIndex) => currentQuestionIndex + 1
        );
        return;
      }
      setCurrentBatchIndex((currentBatchIndex) => currentBatchIndex + 1);
      setCurrentQuestionIndex(
        (currentQuestionIndex) => currentQuestionIndex + 1
      );
      return;
    }
    setCurrentQuestionIndex((currentQuestionIndex) => currentQuestionIndex + 1);
  }
  function previousQuestionClickHandler() {
    if (currentQuestionIndex === 0) return;
    setCurrentQuestionIndex((currentQuestionIndex) => currentQuestionIndex - 1);
  }
  function selectSolutionHandler() {}
  useEffect(() => {
    const url = `${quizBaseUrl}?amount=${currentBatchQuizCount}&category=${category}`;
    async function fetchQuiz() {
      try {
        setIsFetchingData(true);
        const fetchedQuiz = (await axios.get(url)).data;
        setQuiz((currentQuiz) => [...currentQuiz, ...fetchedQuiz.results]);
      } catch (err) {
        console.log("An error has occurred...");
      } finally {
        setIsFetchingData(false);
      }
    }
    fetchQuiz();
  }, [category, currentBatchQuizCount]);
  if (isFetchingData === true || quiz.length === 0) {
    return <Loader />;
  }
  return (
    <section>
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
