/**
 * Returns random integer between from and to inclusive
 * @param {integer} from
 * @param {integer} to
 * @returns { integer }
 */

function getRandomInteger(from = 0, to) {
  return Math.floor(Math.random() * (to - from + 1)) + from;
}

/**
 * Inserts correct solution at a random location among the wrong solutions
 * @param {any[]}  incorrectSolutions
 * @param {string} correctSolution
 * @returns {object}
 */

function insertCorrectSolution(incorrectSolutions = [], correctSolution) {
  const cloneIncorrectSolutions = [...incorrectSolutions];
  const insertAtIndex = getRandomInteger(0, cloneIncorrectSolutions.length);
  cloneIncorrectSolutions.splice(insertAtIndex, 0, correctSolution);
  return cloneIncorrectSolutions;
}

/**
 * Parses query string
 * @param {string} queryString
 * @returns {object}
 */

function parseQueryString(queryString) {
  if(queryString.trim() === "") return {category:"", total: "", difficulty:""};
  return queryString
    .trim()
    .slice(1)
    .split("&")
    .reduce((parsedQueryStringObject, parameterValuePair) => {
      const [parameter, value] = parameterValuePair.split("=");
      parsedQueryStringObject[parameter] = value;
      return parsedQueryStringObject;
    }, {});
}

/**
 * Retrieves option Id given array of options and option name
 * @param {[object]} options
 * @param {string} selectedOptionName
 * @returns {integer|null}
 */

function getSelectedOptionId(options, selectedOptionName) {
  const selectedOption = options.find(
    (option) => option.name === selectedOptionName
  );
  return selectedOption ? selectedOption.id : null;
}

/**
 * Calculates the number of questions to fetch for each API request
 * @param {integer} totalQuizCount
 * @returns {number[]}
 */

function getQuizCountForEachApiRequest(totalQuizCount) {
  const quizCountPerBatch = [];
  while (totalQuizCount >= 50) {
    quizCountPerBatch.push(50);
    totalQuizCount -= 50;
  }
  if (totalQuizCount > 0) {
    quizCountPerBatch.push(totalQuizCount);
  }
  return quizCountPerBatch;
}
/**
 * Formats questions
 * @param {object[]} quizArray 
 */

function formatQuestions(quizArray) {
  return quizArray.map((quizObject) => {
    quizObject.possibleAnswersToSelectFrom = insertCorrectSolution(
      quizObject.incorrect_answers,
      quizObject.correct_answer
    );
    quizObject.correctAnswer = quizObject.correct_answer;
    delete quizObject.incorrect_answers;
    delete quizObject.correct_answer;
    quizObject.hasAttemptedQuiz = false;
    quizObject.selectedAnswer = "";
    return quizObject;
  });
}

/**
 * Formats date into human readable format
 * @param {integer} date 
 * @returns { string }
 */

function formatDate(date) {
  const dateObject = new Date(date);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ]
  return `${months[dateObject.getMonth()]}, ${dateObject.getDate()} ${dateObject.getFullYear()}`;
}

/**
 * Gets token from local storage
 * @returns {string}
 */

function getTokenFromLocalStorage() {
  const token = localStorage.getItem("token");
  return token ? token : "";
}

/**
 * Sets token to local storage
 * @param {string} token
 * @returns { undefined }
 */

function setTokenToLocalStorage(token) {
  localStorage.setItem("token", token);
}

/**
 * Determines if a question is the last question
 * @param {integer} currentQuestionIndex 
 * @param {integer} totalQuestions 
 * @returns {boolean}
 */

function isLastQuestion(currentQuestionIndex, totalQuestions ) {
  return  currentQuestionIndex + 1 === totalQuestions || currentQuestionIndex === 49;
}
/**
 * Determine if the last question has been attempted
 * @param {object} lastQuestionObject 
 * @returns { boolean }
 */

function isLastQuestionAttempted(lastQuestionObject) {
  return lastQuestionObject.selectedAnswer !== "";
}
export {
  insertCorrectSolution,
  parseQueryString,
  getSelectedOptionId,
  getQuizCountForEachApiRequest,
  formatQuestions,
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
  formatDate,
  isLastQuestion,
  isLastQuestionAttempted
};
