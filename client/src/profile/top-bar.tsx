/** @format */

import React, { ReactElement, useEffect, useState } from "react";
import { getMe } from "../utils/utils";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
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
  console.log({ parentState });
  const token = Cookies.get("access_token");
  console.log({ token });
  const { songs, playlists, artists, player } = parentState;
  useEffect(() => {
    getMe(token).then((data) => {
      setState((prevState) => ({
        ...prevState,
        avatar: data.images[0].url,
      }));
    });
  }, []);

  const setBarValues = (title: string) => {
    let stateCopy = { ...parentState };
    let specificValue = !stateCopy[title];
    Object.keys(stateCopy).forEach((key) => {
      if (typeof stateCopy[key] === "boolean") {
        stateCopy[key] = false;
      }
    });
    stateCopy[title] = specificValue;
    setParentState(stateCopy);
  };

  return (
    <nav className="flex bg-white drop-shadow-lg w-full items-center justify-around font-custom">
      <Link
        to="songs"
        className={
          songs
            ? "transition duration-500 ease-in-out group bg-black text-white h-full w-full flex justify-center py-4 cursor-pointer"
            : "transition duration-500 ease-in-out group hover:bg-black h-full w-full flex justify-center py-4 cursor-pointer"
        }
      >
        <div onClick={() => setBarValues("songs")}>
          {/* <input id="songs" type="checkbox" className="hidden" /> */}
          <span className="group-hover:text-white cursor-pointer">Songs</span>
        </div>
      </Link>
      <Link
        to="artists"
        className={
          artists
            ? "transition duration-500 ease-in-out group bg-black text-white h-full w-full flex justify-center py-4 cursor-pointer"
            : "transition duration-500 ease-in-out group hover:bg-black h-full w-full flex justify-center py-4 cursor-pointer"
        }
      >
        <div onClick={() => setBarValues("artists")}>
          {/* <input id="artists" type="checkbox" className="hidden" /> */}
          <span className="group-hover:text-white cursor-pointer">Artists</span>
        </div>
      </Link>
      <Link
        to="profile"
        className="group transition duration-500 ease-in-out h-full w-full flex justify-center py-3 cursor-pointer"
      >
        <div onClick={() => setBarValues("profile")}>
          {/* <input id="profile" type="checkbox" className="hidden" /> */}
          <div className="p-2 border-4 border-white rounded-full group-hover:border-spotify">
            <img
              src={state.avatar}
              className="w-10 h-10 object-cover object-center rounded-full "
            ></img>
          </div>
        </div>
      </Link>
      <Link
        to="playlists"
        className={
          playlists
            ? "transition duration-500 ease-in-out group bg-black text-white h-full w-full flex justify-center py-4 cursor-pointer"
            : "transition duration-500 ease-in-out group hover:bg-black h-full w-full flex justify-center py-4 cursor-pointer"
        }
      >
        <div onClick={() => setBarValues("playlists")}>
          {/* <input id="artists" type="checkbox" className="hidden" /> */}
          <span className="group-hover:text-white cursor-pointer">
            Playlists
          </span>
        </div>
      </Link>
      <Link
        to="player"
        className={
          player
            ? "transition duration-500 ease-in-out group bg-black text-white h-full w-full flex justify-center py-4 cursor-pointer"
            : "transition duration-500 ease-in-out group hover:bg-black h-full w-full flex justify-center py-4 cursor-pointer"
        }
      >
        <div onClick={() => setBarValues("player")}>
          {/* <input id="artists" type="checkbox" className="hidden" /> */}
          <span className="group-hover:text-white cursor-pointer">Player</span>
        </div>
      </Link>
    </nav>
  );
}
