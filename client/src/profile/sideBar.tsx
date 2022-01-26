/** @format */

import React, { ReactElement, useEffect, useState } from "react";
import { getMe } from "../utils/utils";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
interface Props {
  parentState: any;
  setParentState: any;
  accessToken: string;
}

export default function SideBar({
  parentState,
  setParentState,
  accessToken,
}: Props): ReactElement {
  const [state, setState] = useState({
    avatar: "",
  });
  const { songs, playlists, artists, player } = parentState;
  useEffect(() => {
    getMe(accessToken).then((data) => {
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
    <nav className="flex flex-col bg-white drop-shadow-xl font-custom px-10 py-10 my-10 h-[42rem] z-100">
      <div className="flex h-full flex-col">
        <h3 className="pb-20 pt-6 text-3xl bg-clip-text text-transparent bg-gradient-to-br from-red-700 to-red-200">
          Statify
        </h3>
        <div className="flex flex-col items-center justify-center space-y-4 flex-grow">
          <div
            className={
              songs
                ? "transition duration-500 ease-in-out group rounded-md bg-black text-white  w-full flex justify-center py-4 cursor-pointer"
                : "transition duration-500 ease-in-out group rounded-md hover:bg-black w-full flex justify-center py-4 cursor-pointer"
            }
            onClick={() => setBarValues("songs")}
          >
            <span className="group-hover:text-white cursor-pointer">Songs</span>
          </div>

          <div
            className={
              artists
                ? "transition duration-500 ease-in-out group rounded-md bg-black text-white  w-full flex justify-center py-4 cursor-pointer"
                : "transition duration-500 ease-in-out group rounded-md hover:bg-black  w-full flex justify-center py-4 cursor-pointer"
            }
            onClick={() => setBarValues("artists")}
          >
            <span className="group-hover:text-white cursor-pointer">
              Artists
            </span>
          </div>
          <div
            className={
              playlists
                ? "transition duration-500 ease-in-out group rounded-md bg-black text-white  w-full flex justify-center py-4 cursor-pointer"
                : "transition duration-500 ease-in-out group rounded-md hover:bg-black  w-full flex justify-center py-4 cursor-pointer"
            }
            onClick={() => setBarValues("playlists")}
          >
            <span className="group-hover:text-white cursor-pointer">
              Playlists
            </span>
          </div>
          <div
            className={
              player
                ? "transition duration-500 ease-in-out group rounded-md bg-black text-white  w-full flex justify-center py-4 cursor-pointer"
                : "transition duration-500 ease-in-out group rounded-md hover:bg-black  w-full flex justify-center py-4 cursor-pointer"
            }
            onClick={() => setBarValues("player")}
          >
            <span className="group-hover:text-white cursor-pointer">
              Player
            </span>
          </div>
        </div>
        <div className="flex self-end">
          <img
            src={state.avatar}
            className="w-20 h-20 rounded-full object-cover object-top mt-auto"
          />
        </div>
      </div>
    </nav>
  );
}
