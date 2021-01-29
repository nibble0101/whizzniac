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
  return queryString
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
export {
  insertCorrectSolution,
  parseQueryString,
  getSelectedOptionId,
  getQuizCountForEachApiRequest,
};
