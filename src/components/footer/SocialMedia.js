import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faWhatsapp,
  faGithub,
  faCodepen
} from "@fortawesome/free-brands-svg-icons";
function SocialMedia() {
  return (
    <div className="footer-social-media">
      <p>Get in touch</p>
      <a href="/">
        <FontAwesomeIcon icon={faFacebookF} />
      </a>
      <a href="/">
        <FontAwesomeIcon icon={faTwitter} />
      </a>
      <a href="/">
        <FontAwesomeIcon icon={faWhatsapp} />
      </a>
      <a href="/">
        <FontAwesomeIcon icon={faGithub} />
      </a>
      <a href="/">
        <FontAwesomeIcon icon={faCodepen} />
      </a>
    </div>
  );
}

export { SocialMedia };
