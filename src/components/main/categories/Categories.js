import { React, useReducer, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { DropDownOptions } from "./DropDownOptions";
import { Loader } from "../../loader/Loader";
import {
  SET_QUIZ_CATEGORIES,
  SET_QUIZ_CATEGORY_ID,
  SET_QUIZ_DIFFICULTY_LEVEL,
  SET_FETCHING_INDICATOR,
  SET_ERROR_INDICATOR,
  initialState,
  reducer,
} from "../../../reducer/categoriesReducer";
import "../../../styles/Categories.css";
import axios from "axios";
const difficultyLevelObject = [
  { id: 1000, name: "Mixed" },
  { id: 1001, name: "Easy" },
  { id: 1002, name: "Medium" },
  { id: 1003, name: "Hard" },
];
const categoriesUrl = "https://whizzniac-api.herokuapp.com/categories";

/**
 * Container component for fetching Quiz categories
 *
 */

function Categories() {
  const [
    {
      quizCategories,
      quizCategoryId,
      quizDifficultyLevel,
      isFetchingData,
      hasError,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const history = useHistory();

  /**
   * Quiz category handler
   * @param {object} event
   */

  function selectQuizCategory(event) {
    dispatch({
      type: SET_QUIZ_CATEGORY_ID,
      quizCategoryName: event.target.value,
    });
  }

  /**
   * Quiz difficulty level handler
   * @param {object} event
   */

  function selectDifficultyLevel(event) {
    dispatch({
      type: SET_QUIZ_DIFFICULTY_LEVEL,
      quizDifficultyLevel: event.target.value,
    });
  }

  /**
   * Start Quiz handler
   * Redirects to /quiz endpoint
   */

  function startQuizHandler() {
    const path = `/quiz?category=${quizCategoryId}&difficulty=${quizDifficultyLevel.toLowerCase()}`;
    history.push(path);
  }

  useEffect(() => {
    async function fetchQuizCategories() {
      try {
        dispatch({ type: SET_FETCHING_INDICATOR, isFetchingData: true });
        const quizCategories = (await axios.get(categoriesUrl)).data;
        // This dispatch will update categories, difficulty level and quizCategoryId since
        // category list is updated once on mount to avoid dispatching 3 state updates
        dispatch({
          type: SET_QUIZ_CATEGORIES,
          quizDifficultyLevel: difficultyLevelObject[0].name,
          quizCategories,
        });
      } catch (error) {
        console.log(
          `Error Name: ${error.name}, Error Message: ${error.message}`
        );
        dispatch({ type: SET_ERROR_INDICATOR, hasError: true });
      } finally {
        dispatch({ type: SET_FETCHING_INDICATOR, isFetchingData: false });
      }
    }
    fetchQuizCategories();
  }, []);

  if (isFetchingData === true) {
    return <Loader />;
  }
  if (hasError === true) {
    history.push("/error", { message: "Failed to fetch trivia categories" });
    return null;
  }
  return (
    <div className="category">
      <h1 className="category__title"> Select category</h1>
      <div>
        <DropDownOptions
          labelText="Category"
          options={quizCategories}
          changeHandler={selectQuizCategory}
        />
      </div>
      <h1 className="category__title">Select difficulty</h1>
      <div>
        <DropDownOptions
          labelText="Difficulty"
          options={difficultyLevelObject}
          changeHandler={selectDifficultyLevel}
        />
      </div>
      <div style={{ marginTop: "1em" }}>
        <button className="button" onClick={startQuizHandler}>
          Start quiz
        </button>
      </div>
    </div>
  );
}

export { Categories };
