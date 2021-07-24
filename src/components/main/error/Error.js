import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

function Error(props) {
  const { state } = useLocation();
  const history = useHistory();
  function navigateToHomePage() {
    history.push("/");
  }
  return (
    <div>
      <p style={{ color: "brown" }}>
        <FontAwesomeIcon icon={faExclamationCircle} />{" "}
        {state ? state.message : "Unknown error has occurred"}
      </p>
      <p>
        <button onClick={navigateToHomePage} className="button">
          Go to home page
        </button>
      </p>
    </div>
  );
}

export { Error };
