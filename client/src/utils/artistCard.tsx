/** @format */

import React, { ReactElement, useState, useEffect } from "react";
import { getRelatedArtists } from "../utils/utils";
import { v4 as uuidv4 } from "uuid";
import SpotifyLogo from "../assets/spotify.png";

interface Props {
  accessToken: string;
  item: any;
  key: any;
  id: string;
}

export default function ArtistCard({ accessToken, item }: Props): ReactElement {
  const [state, setState] = useState({ similarArtists: [] });
  const [count, setCount] = useState(0);

  const getSimilarArtists = () => {
    getRelatedArtists(accessToken, item.id).then((data) => {
      setState((prevState) => ({
        ...prevState,
        similarArtists: data.artists,
      }));
    });
  };

  useEffect(() => {}, [state.similarArtists]);

  console.log(state.similarArtists);
  console.log(
    state.similarArtists.map((item) => {
      return item.images;
    })
  );

  return (
    <div className="grid grid-cols-2 0 bg-zinc-100 ">
      <div className="flex items-center">
        <div className="">
          <img
            className="rounded-lg w-32 h-32 object-cover"
            src={item.images[1].url}
          />
        </div>
        <div className="w-3/4 px-6">
          <div>
            <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
              {item.name}
            </h5>
          </div>
          <div className="flex flex-col text-gray-700 text-base mb-4">
            <span>Followers: {item.followers.total}</span>
            <span>Popularity: {item.popularity}</span>
          </div>
        </div>
      </div>
      <div className="justify-self-center self-center flex flex-grow justify-center">
        {state.similarArtists.length > 1 ? (
          state.similarArtists.slice(0, 10).map((item) => (
            <div key={uuidv4()}>
              <img
                src={
                  item.images[0]
                    ? item.images[0].url
                    : item.images[1]
                    ? item.images[1].url
                    : item.images[2]
                    ? item.images[2].url
                    : SpotifyLogo
                }
                className="w-20 h-20 object-cover"
              ></img>
            </div>
          ))
        ) : (
          <button
            onClick={() => getSimilarArtists()}
            type="button"
            className="inline-block px-6 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out"
          >
            Explore similar artists
          </button>
        )}
      </div>
    </div>
  );
}
