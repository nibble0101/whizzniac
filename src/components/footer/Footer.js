import React from "react";
import { CopyRight } from "./CopyRight";
import { SocialMedia } from "./SocialMedia";
import { Logo } from "./Logo";
import { FooterAbout } from "./FooterAbout";
import "../../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <section className="footer__top-bar">
        <Logo />
        <FooterAbout />
        <SocialMedia />
      </section>
      <section className="footer__bottom-bar">
        <CopyRight />
      </section>
    </footer>
  );
}

export { Footer };
