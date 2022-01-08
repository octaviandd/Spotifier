/** @format */
import "./style.css";

import React, { ReactElement } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Homepage from "./home/homepage";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route exact path="/" component={Homepage}></Route>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
