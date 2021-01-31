import React from "react";

function Question(props) {
  const { 
      selectSolutionHandler,
      question
    } = props;
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
            {question.possibleAnswersToSelectFrom.map((solution, index) => (
              <p key={Math.random()}>
                <label>
                  <input
                    type="radio"
                    name="solution"
                    value={solution}
                    onChange={() => selectSolutionHandler(solution)}
                    checked={solution === question.selectedAnswer}
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
