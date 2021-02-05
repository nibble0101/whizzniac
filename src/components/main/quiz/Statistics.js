import React from "react";
import Fade from "react-reveal/Fade";

function Statistics(props) {
  const { currentQuestionIndex, total } = props;
  return (
    <section className="statistics">
      <Fade>
        <p>No.</p>
        <p className="numerator">{currentQuestionIndex + 1}</p>
        <hr />
        <p className="denominator">{total}</p>
      </Fade>
    </section>
  );
}

export { Statistics };
