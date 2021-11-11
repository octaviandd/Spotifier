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

  // const setCurrentPage = (currentPage: string) => {
  //   console.log(currentPage);
  //   setState((prevState) => ({
  //     ...prevState,
  //     [currentPage]: true,
  //   }));
  // };

  useEffect(() => {
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

  const decideTransform = (state: any, width: number) => {
    console.log(state);
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
            transform: `translateX(-${decideTransform(state, width)}px)`,
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
