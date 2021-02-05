import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faGithub,
  faCodepen,
} from "@fortawesome/free-brands-svg-icons";
function SocialMedia() {
  return (
    <div className="footer-social-media">
      <p>You can follow me on</p>
      <p className="get-in-touch">
        <a href="/">
          <FontAwesomeIcon icon={faFacebookF} />
        </a>
        <a href="/">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="/">
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a href="/">
          <FontAwesomeIcon icon={faCodepen} />
        </a>
      </p>
    </div>
  );
}

export { SocialMedia };
