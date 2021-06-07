import { getSelectedOptionId } from "../utils/generic-utils";

export const SET_QUIZ_CATEGORIES = "SET_QUIZ_CATEGORIES";
export const SET_QUIZ_CATEGORY_ID = "SET_QUIZ_CATEGORY_ID";
export const SET_QUIZ_DIFFICULTY_LEVEL = "SET_QUIZ_DIFFICULTY_LEVEL";
export const SET_FETCHING_INDICATOR = "SET_FETCHING_INDICATOR";
export const SET_ERROR_INDICATOR = "SET_ERROR_INDICATOR";

export const initialState = {
  quizCategories: [],
  quizCategoryId: 9,
  quizDifficultyLevel: "Mixed",
  isFetchingData: false,
  hasError: false,
};

export function reducer(state, action) {
  switch (action.type) {
    case SET_QUIZ_CATEGORIES:
      const { quizCategories, quizDifficultyLevel } = action;
      return {
        ...state,
        quizCategories: quizCategories,
        quizCategoryId: quizCategories[0].id,
        quizDifficultyLevel,
      };
    case SET_QUIZ_CATEGORY_ID:
      const quizCategoryId = getSelectedOptionId(
        state.quizCategories,
        action.quizCategoryName
      );
      return {
        ...state,
        quizCategoryId,
      };
    case SET_QUIZ_DIFFICULTY_LEVEL:
      return {
        ...state,
        quizDifficultyLevel: action.quizDifficultyLevel,
      };
    case SET_FETCHING_INDICATOR:
      return {
        ...state,
        isFetchingData: action.isFetchingData,
      };
    case SET_ERROR_INDICATOR:
      return {
        ...state,
        hasError: action.hasError,
      };
    default:
      return state;
  }
}
