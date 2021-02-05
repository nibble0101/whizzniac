import React from "react";

function CopyRight() {
  const year = new Date().getFullYear();
  return (
    <div className="footer-copyright">
      <p>
        Copyright {"\u00A9"}{" "}
        <a href="https://mawa.netlify.app/" target="_blank" rel="noreferrer">
          Joseph Mawa
        </a>{" "}
        {`${year > 2020 ? "2020 - " + year : year}`}
      </p>
    </div>
  );
}

export { CopyRight };
