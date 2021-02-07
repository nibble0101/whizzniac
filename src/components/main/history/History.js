import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Loader } from "../../loader/Loader";
import { getTokenFromLocalStorage } from "../../../utils/generic-utils";
import { whizzniacDb } from "../../../config/firebase-config";

function History() {
  const [values, loading, error] = useCollectionData(
    whizzniacDb.where("token", "==", getTokenFromLocalStorage())
  );
  const history = useHistory();

  function clickHandle() {
    whizzniacDb
      .add({ name: "Joseph" })
      .then((doc) => {
        console.log(doc);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (loading) {
    return <Loader />;
  }
  if (error) {
    history.push("/error", { message: "Failed to connect to store" });
    return null;
  }
  console.log(values);
  return (
    <section>
      <h1>Your previous quiz sessions</h1>
      <p>
        Hi there. We are delighted to have you here. This is where you can
        revisit your previous attempts at this quiz.
      </p>
      <p>
        We notice you haven't attempted any quiz yet. Would you like to start?
      </p>
      <button onClick={clickHandle}>Click Test</button>
      <p>
        {" "}
        <Link to="/quiz"> Yes please. Right away </Link>{" "}
      </p>
      <p>
        {" "}
        <Link to="/"> Take me to the home page</Link>
      </p>
    </section>
  );
}

export { History };
