/** @format */

import React, { ReactElement, useEffect, useState } from "react";
import DashboardSideBar from "./DashboardSideBar";
import { Navigate } from "react-router-dom";
import CurrentDisplay from "./CurrentDisplay";

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
    songs: false,
    playlists: false,
    artists: true,
    player: false,
  });

  return accessToken ? (
    <div className="flex space-x-5 relative bg-[#202023]">
      <DashboardSideBar
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
