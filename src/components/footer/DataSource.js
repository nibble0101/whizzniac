import React from "react";

function DataSource() {
  return (
    <div className="data-source">
      <p>Data source</p>
      <p>
        The data used in this app is originally sourced from
        <a
          href="https://opentdb.com/"
          target="_blank"
          rel="noreferrer"
          className="link"
        >
          {" "}
          Open Trivia Database API{" "}
        </a>
        . The API is available under the Creative Commons Attribution-ShareAlike
        4.0 International License.
        <a
          href="https://creativecommons.org/licenses/by-sa/4.0/"
          target="_blank"
          rel="noreferrer"
          className="link"
        >
          <img
            src="https://licensebuttons.net/l/by-sa/4.0/80x15.png"
            alt="creative commons license"
          />
        </a>
      </p>
    </div>
  );
}

export { DataSource };
