import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn
} from "@fortawesome/free-brands-svg-icons";
import { hrefObject } from "../../utils/click-to-share";

function SocialMedia() {
  return (
    <div className="social-media">
      <p>Share</p>
      <p className="social-media__icons">
        <a href={hrefObject.facebook} className="social-media-link">
          <FontAwesomeIcon icon={faFacebookF} />
        </a>
      </p>
      <p className="social-media__icons">
        <a href={hrefObject.twitter} className="social-media-link">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
      </p>
      <p className="social-media__icons">
        <a href={hrefObject.linkedin} className="social-media-link">
          <FontAwesomeIcon icon={faLinkedinIn } />
        </a>
      </p>
    </div>
  );
}

export { SocialMedia };
