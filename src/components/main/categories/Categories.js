import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  const [quizDifficultyLevelId, setQuizDifficultyLevelId] = useState(1000);
  const [isFetchingData, setIsFetchingData] = useState(false);
  function selectQuizCategory(event) {
    const selectedOptionId = getSelectedOptionId(
      quizCategories,
      event.target.value
    );
    setQuizCategoryId(selectedOptionId);
    setQuizCategoryTotal(quizCategoryTotalCounts[`${selectedOptionId}`].total_num_of_verified_questions)
  }

  function selectDifficultyLevel(event) {
    const selectedOptionId = getSelectedOptionId(
      difficultyLevelObject,
      event.target.value
    );
    setQuizDifficultyLevelId(selectedOptionId);
  }
  useEffect(() => {
    async function fetchQuizCategories() {
      try {
        setIsFetchingData(true);
        const categories = (await axios.get(categoriesUrl)).data;
        const categoriesQuizCount = (await axios.get(categoriesQuizCountUrl)).data;
        const { id } = categories.trivia_categories[0];
        setQuizCategories(categories.trivia_categories);
        setQuizCategoryId(id);
        setQuizDifficultyLevelId(difficultyLevelObject[0].id);
        setQuizCategoryTotalCounts(categoriesQuizCount.categories);
        setQuizCategoryTotal(categoriesQuizCount.categories[`${id}`].total_num_of_verified_questions);
      } catch (error) {
        console.log(`Error: ${error.name} Message: ${error.message}`);
      } finally {
        setIsFetchingData(false);
      }
    }
    fetchQuizCategories();
  }, []);
  if (isFetchingData === true) {
    return <Loader />;
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
      <div>
        <Link
          to={`/quiz?category=${quizCategoryId}&total=${quizCategoryTotal}&difficulty=${quizDifficultyLevelId}`}
        >
          Start quiz
        </Link>
      </div>
    </div>
  );
}

export { Categories };
