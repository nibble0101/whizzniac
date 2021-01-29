import React from "react";
import { insertCorrectSolution } from "../../../utils/generic-utils";

function Question(props) {
  const { 
      selectSolutionHandler,
      question
    } = props;

  const randomizedSolutions = insertCorrectSolution(
    question.incorrect_answers,
    question.correct_answer
  );
  return (
    <div className="quiz">
      <form>
        <div>
          <h2>Question</h2>
          <p dangerouslySetInnerHTML={{__html: question.question}} />
        </div>
        <hr  style={{color:'yellow'}}/>
        <div>
          <h2>Solutions</h2>
          <div>
            {randomizedSolutions.map((solution, index) => (
              <p key={Math.random()}>
                <label>
                  <input
                    type="radio"
                    name="solution"
                    value={solution}
                    onChange={selectSolutionHandler}
                    defaultChecked={false}
                  />
                  <span dangerouslySetInnerHTML={{__html: solution}} />
                </label>
              </p>
            ))}
          </div>
        </div>
      </form>
      <hr />
    </div>
  );
}

export { Question };
