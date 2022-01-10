/** @format */

import React, { ReactElement, useState, useEffect } from "react";
import SongStats from "./songs";
import ArtistsStats from "./artists";
import PlaylistStats from "./playlists";
import ProfileStats from "./profile";
import Player from "./player";
import TopBar from "./top-bar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

interface Props {}

export default function Profile({}: Props): ReactElement {
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
      <TopBar parentState={state} setParentState={setState}></TopBar>
      <div>
        <Router>
          <Switch>
            <Route path="songs">
              <SongStats></SongStats>
            </Route>
            <Route path="playlist">
              <PlaylistStats />
            </Route>
            <Route path="profile">
              <ProfileStats></ProfileStats>
            </Route>
            <Route path="artists">
              <ArtistsStats />
            </Route>
            <Route path="player">
              <Player></Player>
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}
