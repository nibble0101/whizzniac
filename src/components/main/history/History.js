import React from "react";
import { useHistory, Link } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Loader } from "../../loader/Loader";
import { getTokenFromLocalStorage } from "../../../utils/generic-utils";
import { whizzniacDb } from "../../../config/firebase-config";
import { FirstTimeUser } from "./FirstTimeUser";
import { QuizAttempts } from "./QuizAttempts";
import "../../../styles/History.css";

function History() {
  const [quizAttempts, loading, error] = useCollectionData(
    whizzniacDb.where("token", "==", getTokenFromLocalStorage())
  );
  const history = useHistory();

  function clearQuizAttemptsHistory(params) {
    const token = getTokenFromLocalStorage();
    if (token && quizAttempts && quizAttempts.length) {
      whizzniacDb
        .doc(token)
        .set({
          token: token,
          attempts: [],
        })
        .then(() => {
          alert("Successfully purged quiz attempts history");
        })
        .catch((err) => {
          alert("An error has occurred", err);
        });
    }
  }
  if (loading) {
    return <Loader />;
  }
  if (error) {
    history.push("/error", { message: "Failed to connect to store" });
    return null;
  }
  return (
    <section className="history">
      <h1>Your previous quiz attempts</h1>
      {quizAttempts && quizAttempts[0] ? (
        <QuizAttempts attempts={quizAttempts[0].attempts} />
      ) : (
        <FirstTimeUser />
      )}
      {quizAttempts && quizAttempts[0] && quizAttempts[0].attempts.length ? (
        <p>
          <button className="button" onClick={clearQuizAttemptsHistory}>
            Clear History
          </button>
        </p>
      ) : null}
      <p>
        <Link className="link link--margin-right" to="/">
          Home Page{"   "}
        </Link>
        <Link className="link" to="/categories">
          Attempt Quiz
        </Link>
      </p>
    </section>
  );
}

export { History };
