import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";

function Logo() {
  return (
    <div>
      <p>WhizzNiac</p>
      <Link to="/">
        <span className="logo-icon">
          <FontAwesomeIcon icon={faBookOpen} />
        </span>
      </Link>
    </div>
  );
}

export { Logo };
