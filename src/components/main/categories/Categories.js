import { Link, Redirect } from "react-router-dom";
import { React, useReducer, useEffect } from "react";
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
import {
  getCategoriesFromLocalStorage,
  setCategoriesToLocalStorage,
} from "../../../utils/generic-utils";
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

  useEffect(() => {
    const source = axios.CancelToken.source();

    async function fetchQuizCategories() {
      try {
        dispatch({ type: SET_FETCHING_INDICATOR, isFetchingData: true });

        // Categories data are saved to local storage using `quizCategories` key
        let quizCategories = getCategoriesFromLocalStorage("quizCategories");
        // If there are no categories data in local storage or they have expired,
        // then fetch from DB
        if (!quizCategories.length) {
          const response = await axios.get(categoriesUrl, {
            cancelToken: source.token,
          });
          if (response.status !== 200) {
            throw new Error("Failed to fetch quiz");
          }
          quizCategories = response.data;
          // quizCategories = (await axios.get(categoriesUrl)).data;
          setCategoriesToLocalStorage("quizCategories", {
            dateSaved: Date.now(),
            categories: quizCategories,
          });
        }
        // This dispatch will update categories, difficulty level and quizCategoryId since
        // category list is updated once on mount to avoid dispatching 3 state updates

        dispatch({
          type: SET_QUIZ_CATEGORIES,
          quizDifficultyLevel: difficultyLevelObject[0].name,
          quizCategories,
        });
        dispatch({ type: SET_FETCHING_INDICATOR, isFetchingData: false });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Data fetching cancelled", error.message);
        } else {
          console.log(
            `Error Name: ${error.name}, Error Message: ${error.message}`
          );
          dispatch({ type: SET_FETCHING_INDICATOR, isFetchingData: false });
          dispatch({ type: SET_ERROR_INDICATOR, hasError: true });
        }
      }
    }
    fetchQuizCategories();
    return () => source.cancel("Data fetching cancelled");
  }, []);

  if (isFetchingData === true) {
    return <Loader />;
  }
  if (hasError === true) {
    return (
      <Redirect
        to={{
          pathname: "/error",
          state: { message: "Failed to fetch Trivia categories" },
        }}
      />
    );
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
        <Link
          to={`/quiz?category=${quizCategoryId}&difficulty=${quizDifficultyLevel.toLowerCase()}`}
          className="link link--style-border"
        >
          Start quiz
        </Link>
      </div>
    </div>
  );
}

export { Categories };
