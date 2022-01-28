/** @format */

import React, { ReactElement, useEffect, useState } from "react";
import { getMe } from "../../utils/SpotifyAPI";
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
    <nav className="fixed flex justify-center top-0 my-0 mx-auto bg-[#202022] drop-shadow-2xl font-sans px-10 z-10 text-slate-100 rounded-tr-lg rounded-br-lg inset-x-0 top-0">
      <div className="flex items-center space-x-5 p-4">
        <div className="">
          <h3 className=" text-3xl bg-clip-text text-transparent bg-gradient-to-br from-red-700 to-red-200">
            Statify
          </h3>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <div
            className={
              songs
                ? "transition duration-500 ease-in-out group rounded-md bg-teal-500 text-white w-full flex justify-center p-4 cursor-pointer"
                : "transition duration-500 ease-in-out group rounded-md hover:bg-teal-300 w-full flex justify-center p-4 cursor-pointer"
            }
            onClick={() => setBarValues("songs")}
          >
            <span className="group-hover:text-white cursor-pointer">Songs</span>
          </div>
          <div
            className={
              artists
                ? "transition duration-500 ease-in-out group rounded-md bg-teal-500 text-white  w-full flex justify-center p-4 cursor-pointer"
                : "transition duration-500 ease-in-out group rounded-md hover:bg-teal-300 w-full flex justify-center p-4 cursor-pointer"
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
                ? "transition duration-500 ease-in-out group rounded-md bg-teal-500 text-white  w-full flex justify-center p-4 cursor-pointer"
                : "transition duration-500 ease-in-out group rounded-md hover:bg-teal-300 w-full flex justify-center p-4 cursor-pointer"
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
                ? "transition duration-500 ease-in-out group rounded-md bg-teal-500 text-white  w-full flex justify-center p-4 cursor-pointer"
                : "transition duration-500 ease-in-out group rounded-md hover:bg-teal-300 w-full flex justify-center p-4 cursor-pointer"
            }
            onClick={() => setBarValues("player")}
          >
            <span className="group-hover:text-white cursor-pointer">
              Player
            </span>
          </div>
        </div>
        <div className="flex">
          <img
            src={state.avatar}
            className="w-16 h-16 rounded-full object-cover object-top mt-auto"
          />
        </div>
      </div>
    </nav>
  );
}
