/** @format */

import React, { ReactElement, useEffect, useState } from "react";
import { getMe } from "../utils/utils";

interface Props {
  parentState: any;
  setParentState: any;
}

export default function TopBar({
  parentState,
  setParentState,
}: Props): ReactElement {
  const [state, setState] = useState({
    avatar: "",
  });
  const { songs, playlists, artists, player } = parentState;
  useEffect(() => {
    let token: string = JSON.parse(window.localStorage.getItem("token"));
    console.log(token);
    getMe(token).then((data) => {
      setState((prevState) => ({
        ...prevState,
        avatar: data.images[0].url,
      }));
    });
  }, []);

  const setSongsValue = (title: string) => {
    setParentState((prevState: any) => ({
      ...prevState,
      [title]: true,
      playlists: false,
      artists: false,
      player: false,
      profile: false,
    }));
  };

  const setArtistsValue = (title: string) => {
    setParentState((prevState: any) => ({
      ...prevState,
      [title]: true,
      playlists: false,
      songs: false,
      player: false,
      profile: false,
    }));
  };

  const setPlayerValue = (title: string) => {
    setParentState((prevState: any) => ({
      ...prevState,
      [title]: true,
      playlists: false,
      songs: false,
      artists: false,
      profile: false,
    }));
  };

  const setPlaylistsValue = (title: string) => {
    setParentState((prevState: any) => ({
      ...prevState,
      [title]: true,
      player: false,
      songs: false,
      artists: false,
      profile: false,
    }));
  };

  return (
    <nav className="flex bg-white drop-shadow-lg w-full items-center justify-around font-custom">
      <div
        onClick={() => setSongsValue("songs")}
        className={
          songs
            ? "transition duration-500 ease-in-out group bg-black text-white h-full w-full flex justify-center py-4 cursor-pointer"
            : "transition duration-500 ease-in-out group hover:bg-black h-full w-full flex justify-center py-4 cursor-pointer"
        }
      >
        {/* <input id="songs" type="checkbox" className="hidden" /> */}
        <span className="group-hover:text-white cursor-pointer">Songs</span>
      </div>
      <div
        onClick={() => setArtistsValue("artists")}
        className={
          artists
            ? "transition duration-500 ease-in-out group bg-black text-white h-full w-full flex justify-center py-4 cursor-pointer"
            : "transition duration-500 ease-in-out group hover:bg-black h-full w-full flex justify-center py-4 cursor-pointer"
        }
      >
        {/* <input id="artists" type="checkbox" className="hidden" /> */}
        <span className="group-hover:text-white cursor-pointer">Artists</span>
      </div>
      <div className="h-full w-full flex justify-center py-3 cursor-pointer">
        {/* <input id="profile" type="checkbox" className="hidden" /> */}
        <a>
          <img
            src={state.avatar}
            className="w-10 h-10 object-cover object-center rounded-full "
          ></img>
        </a>
      </div>
      <div
        onClick={() => setPlaylistsValue("playlists")}
        className={
          playlists
            ? "transition duration-500 ease-in-out group bg-black text-white h-full w-full flex justify-center py-4 cursor-pointer"
            : "transition duration-500 ease-in-out group hover:bg-black h-full w-full flex justify-center py-4 cursor-pointer"
        }
      >
        {/* <input id="artists" type="checkbox" className="hidden" /> */}
        <span className="group-hover:text-white cursor-pointer">Playlists</span>
      </div>
      <div
        onClick={() => setPlayerValue("player")}
        className={
          player
            ? "transition duration-500 ease-in-out group bg-black text-white h-full w-full flex justify-center py-4 cursor-pointer"
            : "transition duration-500 ease-in-out group hover:bg-black h-full w-full flex justify-center py-4 cursor-pointer"
        }
      >
        {/* <input id="artists" type="checkbox" className="hidden" /> */}
        <span className="group-hover:text-white cursor-pointer">Player</span>
      </div>
    </nav>
  );
}
