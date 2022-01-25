/** @format */

import React, { ReactElement, useEffect, useState } from "react";
import { getFollowedArtists, searchArtist } from "../utils/utils";
import { v4 as uuidv4 } from "uuid";
import ArtistCard from "../utils/artistCard";
import {
  ArtistFollowersChart,
  ArtistPopularityChart,
} from "../utils/barCharts";
import SpotifyLogo from "../assets/spotify.png";
import { GenresPieChart } from "../utils/pieCharts";

interface Props {
  accessToken: string;
}

const Modal = ({ setModal }: any) => {
  return (
    <div className="absolute fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto z-100">
      <div className="relative w-auto pointer-events-none">
        <div className="border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
          <div className="flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            <h5 className="text-xl font-medium leading-normal text-gray-800">
              Modal title
            </h5>
            <button
              type="button"
              className="box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
            ></button>
          </div>
          <div className="relative p-4">
            <p>This is a vertically centered modal.</p>
          </div>
          <div className="flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
            <button
              onClick={() => setModal(false)}
              type="button"
              className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

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

export default function ArtistsStats({ accessToken }: Props): ReactElement {
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
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
                setModal={setModal}
              ></ArtistCard>
            ))}
        </div>
      </div>
      {/* {modal && <Modal setModal={setModal}></Modal>} */}
      <div className="flex flex-col justify-start items-center pt-2 pb-20">
        <div className="p-5 w-full flex items-center justify-center">
          <div className="flex justify-center flex-col text-gray-900 text-7xl leading-tight tracking-wide font-medium mb-2 w-full">
            <div className="text-center">Are your artists popular on </div>
            <br></br>
            <div className="text-[#1DB954] text-center">Spotify</div>
          </div>
        </div>
        <div className="h-80">
          <ArtistPopularityChart
            artistsValues={state.artists}
          ></ArtistPopularityChart>
        </div>
        <div className="py-4 px-5 border-2 rounded-md drop-shadow-md bg-zinc-100">
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
          <p className="text-black text-xs indent-8">
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
        <div className="flex justify-end items-center h-80 mt-10">
          <div className="h-full w-full flex flex-start flex-col">
            <span className="text-7xl">How about followers?</span>
          </div>
          <div className="">
            <ArtistFollowersChart
              accessToken={accessToken}
              artistsValues={getFollowers(state.artists)}
            ></ArtistFollowersChart>
          </div>
        </div>
      )}
    </div>
  );
}
