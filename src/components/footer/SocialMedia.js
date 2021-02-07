import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDev,
  faTwitter,
  faGithub,
  faCodepen,
} from "@fortawesome/free-brands-svg-icons";
function SocialMedia() {
  return (
    <div className="footer-social-media">
      <p>You can follow me on</p>
      <p className="get-in-touch">
        <a href="https://dev.to/nibble0101">
          <FontAwesomeIcon icon={faDev} />
        </a>
        <a href="https://twitter.com/MJMAWA">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="https://github.com/nibble0101">
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a href="https://codepen.io/nibble0101">
          <FontAwesomeIcon icon={faCodepen} />
        </a>
      </p>
    </div>
  );
}

export { SocialMedia };
