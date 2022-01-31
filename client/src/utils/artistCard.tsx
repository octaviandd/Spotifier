/** @format */

import React, { ReactElement, useState, useEffect } from "react";
import { getRelatedArtists } from "./SpotifyAPI";
import Carousel from "./Carousel";

interface Props {
  accessToken: string;
  item: any;
  key: any;
  id: string;
}

export default function ArtistCard({ accessToken, item }: Props): ReactElement {
  const [state, setState] = useState({ similarArtists: [] });

  console.log(item.images);

  const getSimilarArtists = () => {
    getRelatedArtists(accessToken, item.id).then((data) => {
      setState((prevState) => ({
        ...prevState,
        similarArtists: data.artists,
      }));
    });
  };

  useEffect(() => {}, [state.similarArtists]);

  return (
    <div className="grid grid-cols-2 bg-[#2c2c30] rounded-xl text-white">
      <div className="flex items-center">
        <div className="">
          <img
            className="rounded-lg w-32 h-32 object-cover"
            src={item.images[2].url}
          />
        </div>
        <div className="w-3/4 px-6">
          <div>
            <h5 className="text-slate-100 text-xl leading-tight font-medium mb-2">
              {item.name}
            </h5>
          </div>
          <div className="flex flex-col text-slate-400 text-base mb-4">
            <span>Followers: {item.followers.total}</span>
            <span>Popularity: {item.popularity}</span>
          </div>
        </div>
      </div>
      <div className="justify-self-center self-center flex flex-grow justify-center">
        {state.similarArtists.length > 1 ? (
          <Carousel
            items={state.similarArtists.slice(0, 16).map((item) => item)}
          ></Carousel>
        ) : (
          <button
            onClick={() => getSimilarArtists()}
            type="button"
            className="inline-block px-6 py-2.5 bg-teal-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-teal-300 hover:shadow-lg focus:bg-teal-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-teal-500 active:shadow-lg transition duration-150 ease-in-out"
          >
            Explore similar artists
          </button>
        )}
      </div>
    </div>
  );
}
