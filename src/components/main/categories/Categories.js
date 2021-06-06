import { React, useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { DropDownOptions } from "./DropDownOptions";
import { Loader } from "../../loader/Loader";
import { getSelectedOptionId } from "../../../utils/generic-utils";
import "../../../styles/Categories.css";
import axios from "axios";
const difficultyLevelObject = [
  { id: 1000, name: "Mixed" },
  { id: 1001, name: "Easy" },
  { id: 1002, name: "Medium" },
  { id: 1003, name: "Hard" },
];
const categoriesUrl = "https://whizzniac-api.herokuapp.com/categories";

function Categories() {
  const [quizCategories, setQuizCategories] = useState([]);
  const [quizCategoryId, setQuizCategoryId] = useState(9);
  const [quizDifficultyLevel, setQuizDifficultyLevel] = useState("Mixed");
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [isError, setIsError] = useState(false);
  const history = useHistory();
  function selectQuizCategory(event) {
    const selectedOptionId = getSelectedOptionId(
      quizCategories,
      event.target.value
    );
    setQuizCategoryId(selectedOptionId);
  }

  function selectDifficultyLevel(event) {
    setQuizDifficultyLevel(event.target.value);
  }

  useEffect(() => {
    async function fetchQuizCategories() {
      try {
        setIsFetchingData(true);
        const categoriesArray = (await axios.get(categoriesUrl)).data;
        setQuizCategories(categoriesArray);
        setQuizCategoryId(categoriesArray[0].id);
        setQuizDifficultyLevel(difficultyLevelObject[0].name);
      } catch (error) {
        console.log(
          `Error Name: ${error.name}, Error Message: ${error.message}`
        );
        setIsError(true);
      } finally {
        setIsFetchingData(false);
      }
    }
    fetchQuizCategories();
  }, []);
  if (isFetchingData === true) {
    return <Loader />;
  }
  if (isError === true) {
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
        <Link
          to={`/quiz?category=${quizCategoryId}&difficulty=${quizDifficultyLevel.toLowerCase()}`}
          className="link"
        >
          Start quiz
        </Link>
      </div>
    </div>
  );
}

export { Categories };
