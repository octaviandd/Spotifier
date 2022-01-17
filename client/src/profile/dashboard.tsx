/** @format */

import React, { ReactElement, useEffect, useState } from "react";
import { fetchTokens } from "../utils/useFetch";
import { getMe } from "../utils/utils";
import SideBar from "./sideBar";
import { Navigate } from "react-router-dom";
import CurrentDisplay from "../profile/currentDisplay";

interface Props {
  accessToken: string;
  setAccessToken: any;
}

export default function Dashboard({
  accessToken,
  setAccessToken,
}: Props): ReactElement {
  const [state, setState] = useState({
    profile: false,
    songs: true,
    playlists: false,
    artists: false,
    player: false,
  });

  useEffect(() => {}, []);

  return accessToken ? (
    <div className="flex">
      <SideBar
        parentState={state}
        setParentState={setState}
        accessToken={accessToken}
      />
      <CurrentDisplay
        parentState={state}
        setParentState={setState}
        accessToken={accessToken}
      ></CurrentDisplay>
    </div>
  ) : (
    <Navigate to="/" />
  );
}
