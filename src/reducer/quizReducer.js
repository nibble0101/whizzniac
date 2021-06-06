export const SET_QUIZ = "SET_QUIZ";
export const SET_PREVIOUS_QUESTION_INDEX = "SET_PREVIOUS_QUESTION_INDEX";
export const SET_NEXT_QUESTION_INDEX = "SET_NEXT_QUESTION_INDEX";
export const SET_FETCHING_INDICATOR = "SET_FETCHING_INDICATOR";
export const SET_WARNING_INDICATOR = "SET_WARNING_INDICATOR";
export const SET_ERROR_INDICATOR = "SET_ERROR_INDICATOR";

export const initialState = {
  quiz: [],
  currentQuestionIndex: 0,
  isFetchingData: false,
  emitWarning: false,
  hasError: false,
};

export function reducer(state, action) {
  switch (action.type) {
    case SET_QUIZ:
      return {
        ...state,
        quiz: action.quiz,
      };
    case SET_PREVIOUS_QUESTION_INDEX:
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex - 1,
      };
    case SET_NEXT_QUESTION_INDEX:
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };
    case SET_FETCHING_INDICATOR:
      return {
        ...state,
        isFetchingData: action.isFetchingData,
      };
    case SET_WARNING_INDICATOR:
      return {
        ...state,
        emitWarning: action.emitWarning,
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
