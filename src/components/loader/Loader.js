import React from "react";
import "./Loader.css";

function Loader() {
  return (
    <div className="loader-wrapper" data-testid="loader">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export { Loader };
