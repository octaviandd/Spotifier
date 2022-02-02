/** @format */
import "./style.css";

import React, { ReactElement } from "react";
import ReactDOM from "react-dom";
import App from "./homepage/App";
import { BrowserRouter as Router } from "react-router-dom";
import { TokenProvider } from "./utils/Context";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <TokenProvider>
        <App></App>
      </TokenProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
