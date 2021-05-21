import React from "react";
import { Link } from "react-router-dom";

export function PageNotFound() {
  return (
    <div className="page-not-found">
      <p>Oops! Page not found</p>
      <p>
        <Link className="link" to="/">
          Take me home
        </Link>
      </p>
    </div>
  );
}
