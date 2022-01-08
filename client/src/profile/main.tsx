/** @format */

import React, { ReactElement, useState, useEffect } from "react";
import {
  getMe,
  getFollowedArtists,
  getRecommendedGenres,
} from "../utils/utils";
import SongStats from "./songs";
import ArtistsStats from "./artists";
import PlaylistStats from "./playlists";
import ProfileStats from "./profile";
import Player from "./player";
import TopBar from "./top-bar";
import useWindowDimensions from "../utils/windowDimensions";

interface Props {}

export default function Profile({}: Props): ReactElement {
  const { width } = useWindowDimensions();
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

  const setWidth = (state: any, width: number) => {
    if (state.songs) {
      return 0;
    } else if (state.artists) {
      return width;
    } else if (state.profile) {
      return width * 2;
    } else if (state.playlists) {
      return width * 3;
    } else if (state.player) {
      return width * 4;
    }
  };

  return (
    <div className="flex flex-col">
      <TopBar parentState={state} setParentState={setState}></TopBar>
      <div
        style={{
          width: width,
        }}
        className="overflow-x-hidden"
      >
        <div
          className="flex relative transition duration-500 ease-in-out"
          style={{
            width: width * 5,
            transform: `translateX(-${setWidth(state, width)}px)`,
          }}
        >
          <SongStats width={width}></SongStats>
          <ArtistsStats width={width}></ArtistsStats>
          <ProfileStats width={width}></ProfileStats>
          <PlaylistStats width={width}></PlaylistStats>
          <Player width={width}></Player>
        </div>
      </div>
    </div>
  );
}
