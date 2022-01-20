/** @format */

import React, { ReactElement, useEffect, useState } from "react";
import { getFollowedArtists, getUserTopTracks } from "../utils/utils";
import { v4 as uuidv4 } from "uuid";
import ArtistCard from "../utils/artistCard";

interface Props {
  accessToken: string;
}

export default function ArtistsStats({ accessToken }: Props): ReactElement {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    songs: [],
    artists: [],
  });

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
  }, [loading]);

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
              <ArtistCard
                accessToken={accessToken}
                item={item}
                key={uuidv4()}
                id={item.id}
              ></ArtistCard>
            ))}
        </div>
      </div>
    </div>
  );
}
