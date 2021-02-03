import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import Fade from "react-reveal/Fade";

function EmitWarning(props) {
  return (
    <div style={{ position: "fixed", top: "100px" }}>
      <Fade when={props.emitWarning}>
        <p
          className="emit-warning"
          style={{ color: "brown", backgroundColor: "black", padding: "1em", width: "500px" }}
        >
          <FontAwesomeIcon icon={faExclamationCircle} /> Please select solution
          before going to the next question
        </p>
      </Fade>
    </div>
  );
}
export { EmitWarning };
