/** @format */

import React, { ReactElement, useEffect, useState } from "react";
import { getFollowedArtists, getUserTopTracks } from "../utils/utils";
import D3Circle from "../utils/d3circle";

interface TopSongs {}

interface Props {
  width: number;
}

export default function ArtistsStats({ width }: Props): ReactElement {
  const [state, setState] = useState({
    songs: [],
  });
  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("token"));
    // getFollowedArtists(token).then((data) => console.log(data.artists));
    getUserTopTracks(token).then((data) =>
      setState((prevState) => ({
        ...prevState,
        songs: destructureData(data.items),
      }))
    );
  }, []);

  const destructureData = (data: any) => {
    let arrayOfSongs: string[] = [];
    console.log(data);
    // data.map(item => {

    // })
    Object.keys(data).forEach((key) => {
      console.log(key);
      if (data[key] === "name") arrayOfSongs.push(data[key]);
    });
    console.log(arrayOfSongs);
    return arrayOfSongs;
  };

  console.log(state);

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
      {/* <D3Circle dataset={} colors={}></D3Circle> */}
    </div>
  );
}
