import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Loader } from "../../loader/Loader";
import { getTokenFromLocalStorage } from "../../../utils/generic-utils";
import { whizzniacDb } from "../../../config/firebase-config";
import { FirstTimeUser } from "./FirstTimeUser";
import { QuizAttempts } from "./QuizAttempts";

function History() {
  const [quizAttempts, loading, error] = useCollectionData(
    whizzniacDb.where("token", "==", getTokenFromLocalStorage())
  );
  const history = useHistory();

  if (loading) {
    return <Loader />;
  }
  if (error) {
    history.push("/error", { message: "Failed to connect to store" });
    return null;
  }
  console.log(quizAttempts);
  return (
    <section>
      <h1>Your previous quiz sessions</h1>
      {quizAttempts && quizAttempts[0] ? (
        <QuizAttempts attempts={quizAttempts[0].attempts} />
      ) : (
        <FirstTimeUser />
      )}

      <p>
        <Link to="/categories"> Yes please. Right away </Link>
      </p>
      <p>
        <Link to="/"> Take me to the home page</Link>
      </p>
    </section>
  );
}

export { History };
