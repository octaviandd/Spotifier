/** @format */

import React, { ReactElement, useState } from "react";
import DashboardSideBar from "./DashboardNavbar";
import CurrentDisplay from "./CurrentDisplay";
import { useToken } from "../../utils/Context";

interface Props {}

export default function Dashboard({}: Props): ReactElement {
  const [state, setState] = useState({
    profile: false,
    songs: false,
    playlists: true,
    artists: false,
    player: false,
  });

  return (
    <div className="flex relative m-w-full">
      <DashboardSideBar setParentState={setState} parentState={state} />
      <CurrentDisplay parentState={state}></CurrentDisplay>
    </div>
  );
}
