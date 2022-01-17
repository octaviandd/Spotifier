/** @format */

import React, { ReactElement, useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

interface Props {
  code: string;
}

export default function Profile({ code }: Props): ReactElement {
  const [state, setState] = useState({
    token: "",
    profile: false,
    songs: true,
    playlists: false,
    artists: false,
    player: false,
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      token: JSON.parse(window.localStorage.getItem("token")),
    }));
  }, []);

  return (
    <div className="flex flex-col">
      {/* <TopBar parentState={state} setParentState={setState}></TopBar> */}
      <div>
        <Router>
          <Routes></Routes>
        </Router>
      </div>
    </div>
  );
}
