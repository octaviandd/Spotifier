/** @format */

import React, { ReactElement, useEffect, useState } from "react";
import { getFollowedArtists, getUserTopTracks } from "../utils/utils";
import D3Circle from "../utils/d3circle";

interface TopSongs {
  album: any;
  artists: any;
  available_markets: any;
  disc_number: number;
  duration_ms: number;
  name: string;
  popularity: number;
  id: string;
  external_urls: {
    spotify: string;
  };
}

interface Props {}

export default function ArtistsStats({}: Props): ReactElement {
  const [timeRange, setTimeRange] = useState("medium_term");
  const [state, setState] = useState({
    songs: [],
  });
  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("token"));
    // getFollowedArtists(token).then((data) => console.log(data.artists));
    getUserTopTracks(token, timeRange).then((data) => {
      let items = destructureData(data.items);
      return setState((prevState) => ({
        ...prevState,
        songs: items,
      }));
    });
  }, []);

  const destructureData = (data: any) => {
    let arrayOfSongs: string[] = [];
    Object.keys(data).forEach((key) => {
      arrayOfSongs.push(data[key].name);
    });
    return arrayOfSongs;
  };

  return (
    <div className="flex justify-center pt-5 flex-col">
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
