import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

function SocialMedia() {
  return (
    <div className="social-media">
      <p>Share</p>
      <p className="social-media__icons">
        <a href="/">
          <FontAwesomeIcon icon={faFacebookF} />
        </a>
      </p>
      <p className="social-media__icons">
        <a href="/">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
      </p>
      <p className="social-media__icons">
        <a href="/">
          <FontAwesomeIcon icon={faWhatsapp} />
        </a>
      </p>
    </div>
  );
}

export { SocialMedia };
