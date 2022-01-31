/** @format */

import React, { ReactElement, useState, useEffect } from "react";
import {
  getFeaturedPlaylists,
  getMe,
  getUserPlaylists,
} from "../../utils/SpotifyAPI";
import SpotifyLogo from "../../../images/spotify.png";
import { uniqueId } from "lodash";

interface Props {
  accessToken: string;
}

export default function PlaylistStats({ accessToken }: Props): ReactElement {
  const [userID, setUserID] = useState("");
  const [playlists, setPlaylists]: any = useState();
  const [featuredPlaylists, setFeaturedPlaylists]: any = useState();

  useEffect(() => {
    getMe(accessToken).then((res) => {
      setUserID(res.id);
    });
  }, []);

  useEffect(() => {
    if (userID !== "") {
      getUserPlaylists(accessToken, userID).then((res) => {
        setPlaylists(res.items);
      });
    }
  }, [userID]);

  useEffect(() => {
    getFeaturedPlaylists(accessToken).then((res) => {
      setFeaturedPlaylists(res.playlists.items);
    });
  }, []);

  return (
    <div className="px-6">
      <div className="flex flex-row items-center mb-3">
        <div className="flex-grow">
          <span className="text-4xl font-mono">Your Playlists</span>
        </div>
      </div>
      <div className="grid auto-rows-max auto-cols-max grid-cols-3 space-x-4 space-y-4 p-5">
        {playlists &&
          playlists.map((item: any) => (
            <div
              key={uniqueId()}
              className="flex flex-col items-center justify-center max-w-xs rounded-lg"
            >
              <img
                className="object-cover"
                src={
                  item.images[0]
                    ? item.images[0].url
                    : item.images[1]
                    ? item.images[1].url
                    : item.images[2]
                    ? item.images[2].url
                    : SpotifyLogo
                }
              />
              <p className="text-ellipsis w-full py-3 text-center text-black border-1 bg-[#ECEEEE]">
                {item.name}
              </p>
            </div>
          ))}
      </div>
      <div className="flex flex-row items-center pb-10 pt-5 border-b-2 border-[#525252]">
        <div className="flex-grow">
          <span className="text-4xl font-mono">Featured Playlists</span>
        </div>
      </div>
      <div className="grid grid-flow-col space-x-4 space-y-4 p-5">
        {featuredPlaylists &&
          featuredPlaylists.map((item: any) => (
            <div
              key={uniqueId()}
              className="flex flex-col items-center justify-center"
            >
              <img
                className="m-w-64 m-h-64 h-auto w-auto"
                src={
                  item.images[0]
                    ? item.images[0].url
                    : item.images[1]
                    ? item.images[1].url
                    : item.images[2]
                    ? item.images[2].url
                    : SpotifyLogo
                }
              />
              <p className="text-black w-full py-3 text-center border-1 bg-[#ECEEEE]">
                {item.name}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
