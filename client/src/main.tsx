/** @format */

import React, { ReactElement } from "react";
import Profile from "./profile/profile";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Homepage from "./home/homepage";

interface Props {}

export default function Main({}: Props): ReactElement {
  return (
    <Router>
      <Route exact path="/" component={Homepage}></Route>
    </Router>
  );
}
