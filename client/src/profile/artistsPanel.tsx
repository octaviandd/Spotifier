/** @format */

import React, { ReactElement, useEffect, useState } from "react";
import { getFollowedArtists, getUserTopTracks } from "../utils/utils";
import { v4 as uuidv4 } from "uuid";
import { getRelatedArtists } from "../utils/utils";

interface Props {
  accessToken: string;
}

export default function ArtistsStats({ accessToken }: Props): ReactElement {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("medium_term");
  const [state, setState] = useState({
    songs: [],
    artists: [],
  });

  const orderArtistsList = () => {};

  const getRelatedArtist = (id: any) => {
    let data = getRelatedArtists(accessToken, id);
    console.log(data);
  };

  useEffect(() => {
    try {
      setLoading(true);
      getFollowedArtists(accessToken).then((data) => {
        setState((prevState) => ({
          ...prevState,
          artists: data.artists.items,
        }));
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(true);
    }
    setLoading(false);
  }, [loading, timeRange]);

  const destructureData = (data: any) => {
    let arrayOfSongs: string[] = [];
    Object.keys(data).forEach((key) => {
      arrayOfSongs.push(data[key].name);
    });
    return arrayOfSongs;
  };

  console.log(state);

  return (
    <div className="flex flex-col pt-5 px-6 w-full">
      <div className="mb-10">
        <div className="flex flex-row items-center pb-10 pt-5 border-b-2 border-grey-500">
          <div className="flex-grow">
            <span className="text-4xl font-mono">1. Followed artists</span>
          </div>
          <div className="flex-grow">
            <select className="py-3 px-5 rounded-md">
              <option value="popularity">By Popularity</option>
              <option value="followers">By Followers</option>
              <option value="alphabet">By Name</option>
            </select>
            <button></button>
          </div>
        </div>
        <div className="flex flex-col space-y-6 my-6">
          {!loading &&
            state.artists.map((item) => (
              <div key={uuidv4()} className="flex items-center bg-zinc-100">
                <div>
                  <img
                    className="rounded-lg w-20 h-20 object-cover"
                    src={item.images[2].url}
                  />
                </div>
                <div className="w-3/4 px-6">
                  <div>
                    <span>{item.name}</span>
                  </div>
                  <div className="flex flex-col">
                    <span>Followers: {item.followers.total}</span>
                    <span>Popularity: {item.popularity}</span>
                  </div>
                  {/* <div>
                    [
                    {item.genres.map((item: any) => (
                      <span>"{item}"</span>
                    ))}
                    ]
                  </div> */}
                  <div>
                    <button onClick={() => getRelatedArtist(item.id)}>
                      Get similar artists
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
