/** @format */

import React, { ReactElement, useEffect, useState } from "react";
import { getFollowedArtists } from "../utils/utils";
//https://api.spotify.com/v1/me/following

interface Props {
  width: number;
}

export default function ArtistsStats({ width }: Props): ReactElement {
  useEffect(() => {
    // let token = JSON.parse(localStorage.getItem("token"));
    // getFollowedArtists(token).then((data) => console.log(data));
  });

  return (
    <div className="flex justify-center pt-5" style={{ width: width }}>
      <div>
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
