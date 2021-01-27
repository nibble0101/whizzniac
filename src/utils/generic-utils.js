/**
 * Returns random integer between from and to inclusive
 * @param {integer} from 
 * @param {integer} to 
 */

function getRandomInteger(from = 0, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
}

/**
 * Inserts correct solution at a random location among the wrong solutions
 * @param {any[]}  incorrectSolutions 
 * @param {string} correctSolution 
 */

function insertCorrectSolution(incorrectSolutions = [], correctSolution) {
   const cloneIncorrectSolutions = [...incorrectSolutions];
   const insertAtIndex = getRandomInteger(0, cloneIncorrectSolutions.length);
   cloneIncorrectSolutions.splice(insertAtIndex, 0, correctSolution);
   return cloneIncorrectSolutions;   
}

function getSelectedOptionId(options, selectedOptionName) {
    const selectedOption = options.find(option => option.name === selectedOptionName);
    return selectedOption ? selectedOption.id : null;
}
export { insertCorrectSolution, getSelectedOptionId }