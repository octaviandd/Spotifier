/** @format */

import React, { ReactElement, useMemo, useState } from "react";
import WebPlayback from "../../utils/webPlayback";

interface Props {}

export default function Player({}: Props): ReactElement {
  let accessToken = window.localStorage.getItem("spotify_access_token");
  return (
    <div>
      <WebPlayback accessToken={accessToken}></WebPlayback>
    </div>
  );
}
