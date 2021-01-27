import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Quiz(props) {
  const { category, total, difficulty } = useParams();
  const [quiz, setQuiz] = useState([]);
  useEffect(() => {
    let quizCount;
    const { length } = quiz;
    if(total === length){
        return;
    }else if(length < total){
        if(total - length >= 50){
            quizCount = 50;
        }else{
            quizCount = total - length;
        }
    }
    const uri = `${quizCount}`;

  }, [category, total, quiz]);
  return (
    <section>
      <p> Category: {category}</p>
      <p> Difficulty: {difficulty}</p>
      <p> Total: {total}</p>
    </section>
  );
}

export { Quiz };
