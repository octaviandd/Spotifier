/** @format */

import React, { ReactElement, useEffect, useState, useRef } from "react";
import { getMe, logOut } from "../../utils/SpotifyAPI";
interface Props {
  parentState: any;
  setParentState: any;
}

export default function DashboardNavbar({
  parentState,
  setParentState,
}: Props): ReactElement {
  const [state, setState] = useState({
    avatar: "",
  });
  const [scrollState, setScrollState] = useState("top");
  let listener: any = null;
  const { songs, playlists, artists, player } = parentState;
  const ref: any = useRef();

  useEffect(() => {
    listener = document.addEventListener("scroll", (e) => {
      var scrolled = document.scrollingElement.scrollTop;
      if (scrolled >= 90) {
        if (scrollState !== "amir") {
          setScrollState("amir");
        }
      } else {
        if (scrollState !== "top") {
          setScrollState("top");
        }
      }
    });
    return () => {
      document.removeEventListener("scroll", listener);
    };
  }, [scrollState]);

  useEffect(() => {
    getMe().then((data) => {
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
    <nav
      ref={ref}
      className={
        scrollState === "top"
          ? "fixed flex transition-all ease-in-out justify-center items-center md:justify-start top-0 my-0 bg-white font-sans lg:px-10 py-5 z-10 text-black inset-x-0 top-0 subpixel-antialiased tracking-wide font-semibold"
          : "fixed flex transition-all ease-in-out justify-center items center md:justify-start top-0 my-0 bg-[#202023] drop-shadow-xl font-sans py-5 lg:px-10 z-10 text-white inset-x-0 top-0 subpixel-antialiased tracking-wide font-semibold"
      }
    >
      <div className="flex-wrap flex md:flex-nowrap justify-center md:justify-start items-center space-x-5 px-4 w-full">
        <div className="hidden md:block">
          <h3 className="pb-5 md:pb-0 text-3xl bg-clip-text text-transparent bg-gradient-to-br from-red-700 to-red-200">
            Statify
          </h3>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <div
            className={
              songs
                ? "transition duration-500 ease-in-out group rounded-md bg-violet-600 text-white w-full flex justify-center p-4 cursor-pointer"
                : "transition duration-500 ease-in-out group rounded-md hover:bg-violet-800 w-full flex justify-center p-4 cursor-pointer"
            }
            onClick={() => !songs && setBarValues("songs")}
          >
            <span className="group-hover:text-white cursor-pointer">Songs</span>
          </div>
          <div
            className={
              artists
                ? "transition duration-500 ease-in-out group rounded-md bg-violet-600 text-white w-full flex justify-center p-4 cursor-pointer"
                : "transition duration-500 ease-in-out group rounded-md hover:bg-violet-800 w-full flex justify-center p-4 cursor-pointer"
            }
            onClick={() => !artists && setBarValues("artists")}
          >
            <span className="group-hover:text-white cursor-pointer">
              Artists
            </span>
          </div>
          <div
            className={
              playlists
                ? "transition duration-500 ease-in-out group rounded-md bg-violet-600 text-white w-full flex justify-center p-4 cursor-pointer"
                : "transition duration-500 ease-in-out group rounded-md hover:bg-violet-800 w-full flex justify-center p-4 cursor-pointer"
            }
            onClick={() => !playlists && setBarValues("playlists")}
          >
            <span className="group-hover:text-white cursor-pointer">
              Playlists
            </span>
          </div>
        </div>
        <div className="md:flex hidden">
          <img
            src={state.avatar}
            className="w-16 h-16 rounded-full object-cover object-top mt-auto"
          />
        </div>
      </div>
      <div className="flex px-4 py-3 cursor-pointer rounded-md whitespace-nowrap hover:bg-[#00CA4E] transition duration-500 ease-in-out group mr-2">
        <span className="flex items-center" onClick={() => logOut()}>
          <span className="hidden md:block">LOGOUT</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 pl-0 md:pl-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke={scrollState === "top" ? "black" : "white"}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </span>
      </div>
    </nav>
  );
}
