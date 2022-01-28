/** @format */

import React, { ReactElement, useState, useEffect } from "react";
import {
  getFeaturedPlaylists,
  getMe,
  getUserPlaylists,
} from "../../utils/SpotifyAPI";
import SpotifyLogo from "../../assets/spotify.png";
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
    <div className="pt-5 px-6">
      <div className=" flex flex-row items-center pb-10 pt-5 border-b-2 border-grey-500">
        <div className="flex-grow">
          <span className="text-4xl font-mono">1. Your Playlists</span>
        </div>
      </div>
      <div className="grid auto-rows-fr auto-cols-fr space-x-4 space-y-4 p-5">
        {playlists &&
          playlists.map((item: any) => (
            <div
              key={uniqueId()}
              className="flex flex-col items-center justify-center"
            >
              <img
                className="w-72 h-72"
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
              <p className="text-ellipsis w-full py-3 text-center border-1 bg-slate-200">
                {item.name}
              </p>
            </div>
          ))}
      </div>
      <div className="flex flex-row items-center pb-10 pt-5 border-b-2 border-grey-500">
        <div className="flex-grow">
          <span className="text-4xl font-mono">2. Featured Playlists</span>
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
              <p className=" w-full py-3 text-center border-1 bg-slate-200">
                {item.name}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}