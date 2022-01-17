/** @format */

import React, { ReactElement, useState, useEffect } from "react";
import SongStats from "./songs";
import ArtistsStats from "./artists";
import PlaylistStats from "./playlists";
import ProfileStats from "./profile";
import Player from "./player";
import TopBar from "./sideBar";
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
          <Routes>
            <Route path="songs" element={SongStats}></Route>
            <Route path="playlist" element={PlaylistStats}></Route>
            <Route path="profile" element={Profile}></Route>
            <Route path="artists" element={ArtistsStats}></Route>
            <Route path="player" element={Player}></Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}
