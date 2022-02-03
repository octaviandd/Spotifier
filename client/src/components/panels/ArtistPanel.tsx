/** @format */

import React, { ReactElement, useEffect, useState, useRef } from "react";
import { useIsVisible } from "../../utils/utils";
import { getFollowedArtists } from "../../utils/SpotifyAPI";
import { v4 as uuidv4 } from "uuid";
import ArtistCard from "../../utils/ArtistCard";
import {
  ArtistFollowersChart,
  ArtistPopularityChart,
} from "../../utils/BarCharts";
import SpotifyLogo from "../../../images/spotify.png";
import Spinner from "../../utils/Spinner";

interface Props {}

const getFollowers = (data: any) => {
  let obj = [];
  for (let i = 0; i < data.length; i++) {
    obj.push({
      name: data[i].name,
      followers: data[i].followers.total,
      icon: data[i].images[0]
        ? data[i].images[0].url
        : data[i].images[1]
        ? data[i].images[1].url
        : data[i].images[2]
        ? data[i].images[2].url
        : SpotifyLogo,
    });
  }

  obj.sort((a: any, b: any) =>
    a.followers > b.followers ? 1 : b.followers > a.followers ? -1 : 0
  );

  return obj;
};

export default function ArtistsStats({}: Props): ReactElement {
  const [state, setState] = useState({
    songs: [],
    artists: [],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    try {
      getFollowedArtists().then((data) => {
        setState((prevState) => ({
          ...prevState,
          artists: data.artists.items,
        }));
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  }, []);

  return (
    <div className="flex flex-col px-6 w-full">
      <div className="mb-3 h-full w-full">
        <div className="flex flex-row items-center pb-10">
          <div className="flex-grow">
            <span className="text-5xl md:text-7xl text-center text-[#363636] font-semibold ">
              Followed artists
            </span>
          </div>
          <div className="flex justify-end flex-grow text-black">
            <select className="py-3 px-5 rounded-md appearance-none">
              <option value="popularity">By Popularity</option>
              <option value="followers">By Followers</option>
              <option value="alphabet">By Name</option>
            </select>
            <button></button>
          </div>
        </div>
        <div className="grid grid-cols-1 grid-row-auto gap-y-6 gap-x-6 pt-6 lg:grid-cols-2">
          {state.artists.map((item) => (
            <ArtistCard item={item} key={uuidv4()} id={item.id}></ArtistCard>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-start items-center pt-2 pb-20">
        <div className="p-5 w-full flex items-center justify-center">
          <div className="flex justify-center flex-col text-black text-5xl md:text-7xl leading-tight tracking-wide font-medium mb-2 w-full">
            <div className="text-center text-[#363636] font-semibold">
              Are your artists popular on{" "}
            </div>
            <br></br>
            <div className="text-[#1DB954] text-center font-bold">Spotify</div>
          </div>
        </div>
        <div className="w-full">
          <ArtistPopularityChart
            artistsValues={state.artists}
          ></ArtistPopularityChart>
        </div>
        <div
          className="py-4 px-5 border-2 rounded-md drop-shadow-md "
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-[#fff] text-xs indent-8">
            The popularity of the track. The value will be between 0 and 100,
            with 100 being the most popular. The popularity of a track is a
            value between 0 and 100, with 100 being the most popular. The
            popularity is calculated by algorithm and is based, in the most
            part, on the total number of plays the track has had and how recent
            those plays are. Generally speaking, songs that are being played a
            lot now will have a higher popularity than songs that were played a
            lot in the past. Duplicate tracks (e.g. the same track from a single
            and an album) are rated independently. Artist and album popularity
            is derived mathematically from track popularity. Note: the
            popularity value may lag actual popularity by a few days: the value
            is not updated in real time.
          </p>
        </div>
      </div>
      {state.artists.length > 1 && (
        <div className="flex items-center mt-10 flex-col">
          <div className="h-full w-full flex flex-start flex-col mb-5">
            <span className="text-5xl md:text-7xl text-[#363636] font-semibold">
              How about followers?
            </span>
          </div>
          <div className="w-full">
            <ArtistFollowersChart
              artistsValues={getFollowers(state.artists)}
            ></ArtistFollowersChart>
          </div>
        </div>
      )}
    </div>
  );
}
