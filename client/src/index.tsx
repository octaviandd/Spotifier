/** @format */
import "./style.css";

import React, { ReactElement } from "react";
import ReactDOM from "react-dom";
import Homepage from "./homepage/Homepage";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Homepage></Homepage>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
