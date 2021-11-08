/** @format */

import React, { ReactElement, useEffect, useState } from "react";
import { getFollowedArtists } from "../utils/utils";
//https://api.spotify.com/v1/me/following

interface Props {}

export default function ArtistsStats({}: Props): ReactElement {
  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("token"));
    getFollowedArtists(token).then((data) => console.log(data));
  });

  return (
    <div className="flex w-full justify-center pt-5">
      <div className="container">
        <div>
          <span className="text-4xl font-mono">Followed artists</span>
        </div>
        <div>
          <p>Filters</p>
          <select></select>
          <button></button>
        </div>
      </div>
    </div>
  );
}
