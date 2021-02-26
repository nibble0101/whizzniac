import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import Fade from "react-reveal/Fade";

function EmitWarning(props) {
  return (
    <div>
      <Fade when={props.emitWarning}>
        <p
          className="emit-warning"
          style={{ backgroundColor: "black", padding: "1em" }}
        >
          <span style={{ color: "brown" }}>
            {" "}
            <FontAwesomeIcon icon={faExclamationCircle} />
          </span>{" "}
          Please select solution before going to the next question
        </p>
      </Fade>
    </div>
  );
}
export { EmitWarning };
