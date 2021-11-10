/** @format */

import React, { ReactElement, useState, useEffect } from "react";
import {
  getMe,
  getFollowedArtists,
  getRecommendedGenres,
} from "../utils/utils";
import SongStats from "./songs-stats";
import ArtistsStats from "./artists-stats";
import PlaylistStats from "./playlist-stats";
import ProfileStats from "./profile-stats";
import Player from "./player";
import TopBar from "./top-bar";

interface Props {}

export default function Profile({}: Props): ReactElement {
  const [state, setState] = useState({
    token: "",
    profile: true,
    songs: false,
    playlists: false,
    artists: false,
    player: false,
  });

  // const setCurrentPage = (currentPage: string) => {
  //   console.log(currentPage);
  //   setState((prevState) => ({
  //     ...prevState,
  //     [currentPage]: true,
  //   }));
  // };

  useEffect(() => {
    console.log(state.songs);
    if (window.location.hash !== undefined) {
      let hash: string | undefined = window.location.hash;
      let hashValues: string[] = hash.substring(1).split("&");

      let access_token: string = hashValues[0].split("=")[1];
      let accces_state: string = hashValues[3].split("=")[1];

      setState((prevState) => ({
        ...prevState,
        token: access_token,
      }));
      window.localStorage.setItem("token", JSON.stringify(access_token));
    }
  }, [window.location.hash]);

  return (
    <div className="flex flex-col">
      <TopBar parentState={state} setParentState={setState}></TopBar>
      {state.songs && <SongStats></SongStats>}
      {state.artists && <ArtistsStats></ArtistsStats>}
      {state.profile && <ProfileStats></ProfileStats>}
      {state.playlists && <PlaylistStats></PlaylistStats>}
      {state.player && <Player></Player>}
    </div>
  );
}
