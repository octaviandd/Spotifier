/** @format */

import React, { ReactElement, useEffect, useState } from "react";
import { getMe } from "../utils/utils";

interface Props {}

export default function TopBar({}: Props): ReactElement {
  const [state, setState] = useState({
    avatar: "",
  });
  useEffect(() => {
    let token: string = JSON.parse(window.localStorage.getItem("token"));
    console.log(token);
    getMe(token).then((data) => {
      console.log(data);
      setState((prevState) => ({
        ...prevState,
        avatar: data.images[0].url,
      }));
    });
  }, []);

  return (
    <nav className="flex bg-white drop-shadow-lg w-full items-center justify-around">
      <div className="transition duration-500 ease-in-out group hover:bg-black h-full w-full flex justify-center py-4">
        <a className="group-hover:text-white">Songs</a>
      </div>
      <div className="transition duration-500 ease-in-out group hover:bg-black h-full w-full flex justify-center py-4">
        <a className=" group-hover:text-white group-hover:scale-110">Artists</a>
      </div>
      <div className="h-full w-full flex justify-center py-3">
        <a>
          <img
            src={state.avatar}
            className="w-10 h-10 object-cover object-center rounded-full"
          ></img>
        </a>
      </div>
      <div className="transition duration-500 ease-in-out group hover:bg-black h-full w-full flex justify-center py-4">
        <a className="group-hover:text-white">Playlists</a>
      </div>
      <div className="transition duration-500 ease-in-out group hover:bg-black h-full w-full flex justify-center py-4">
        <a className="group-hover:text-white">Player</a>
      </div>
    </nav>
  );
}
