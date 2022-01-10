/** @format */
import "./style.css";

import React, { ReactElement } from "react";
import ReactDOM from "react-dom";
import Homepage from "./home/homepage";

ReactDOM.render(
  <React.StrictMode>
    <Homepage></Homepage>
  </React.StrictMode>,
  document.getElementById("root")
);
