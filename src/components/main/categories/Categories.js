import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { DropDownOptions } from "./DropDownOptions";
import { Loader } from "../../loader/Loader";
import { getSelectedOptionId } from "../../../utils/generic-utils";
import axios from "axios";
const difficultyLevelObject = [
  { id: 1000, name: "Mixed" },
  { id: 1001, name: "Easy" },
  { id: 1002, name: "Medium" },
  { id: 1003, name: "Hard" },
];
const categoriesUrl = "https://opentdb.com/api_category.php";
const categoriesQuizCountUrl = "https://opentdb.com/api_count_global.php";

function Categories() {
  const [quizCategories, setQuizCategories] = useState([]);
  const [quizCategoryTotalCounts, setQuizCategoryTotalCounts] = useState({});
  const [quizCategoryId, setQuizCategoryId] = useState(9);
  const [quizCategoryTotal, setQuizCategoryTotal] = useState(0);
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
    setQuizCategoryTotal(
      quizCategoryTotalCounts[`${selectedOptionId}`]
        .total_num_of_verified_questions
    );
  }

  function selectDifficultyLevel(event) {
    setQuizDifficultyLevel(event.target.value);
  }
  function startQuizHandler() {
    const path = `/quiz?category=${quizCategoryId}&total=${quizCategoryTotal}&difficulty=${quizDifficultyLevel.toLowerCase()}`;
    history.push(path);
  }
  useEffect(() => {
    async function fetchQuizCategories() {
      try {
        setIsFetchingData(true);
        const categories = (await axios.get(categoriesUrl)).data;
        const categoriesQuizCount = (await axios.get(categoriesQuizCountUrl))
          .data;
        const { id } = categories.trivia_categories[0];
        setQuizCategories(categories.trivia_categories);
        setQuizCategoryId(id);
        setQuizDifficultyLevel(difficultyLevelObject[0].name);
        setQuizCategoryTotalCounts(categoriesQuizCount.categories);
        setQuizCategoryTotal(
          categoriesQuizCount.categories[`${id}`]
            .total_num_of_verified_questions
        );
      } catch (error) {
        console.log(`Error Name: ${error.name}, Error Message: ${error.message}`);
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
  if(isError === true){
    history.push("/error", {message: "Failed to fetch trivia categories"});
    return null;
  }
  return (
    <div className="category">
      <h1> Select category</h1>
      <div>
        <DropDownOptions
          labelText="Category"
          options={quizCategories}
          changeHandler={selectQuizCategory}
        />
      </div>
      <h1>Select difficulty</h1>
      <div>
        <DropDownOptions
          labelText="Difficulty"
          options={difficultyLevelObject}
          changeHandler={selectDifficultyLevel}
        />
      </div>
      <div style={{marginTop: "1em"}}>
        <button className="button" onClick={startQuizHandler}>
          Start quiz
        </button>
      </div>
    </div>
  );
}

export { Categories };
