/** @format */

import React, { ReactElement, useState, useEffect } from "react";
import {
  getFeaturedPlaylists,
  getMe,
  getUserPlaylists,
} from "../../utils/SpotifyAPI";
import SpotifyLogo from "../../../images/spotify.png";
import { uniqueId } from "lodash";

interface Props {}

export default function PlaylistStats({}: Props): ReactElement {
  const [userID, setUserID] = useState("");
  const [playlists, setPlaylists]: any = useState();
  const [featuredPlaylists, setFeaturedPlaylists]: any = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
    getMe().then((res) => {
      setUserID(res.id);
    });
  }, []);

  useEffect(() => {
    if (userID !== "") {
      getUserPlaylists(userID).then((res) => {
        setPlaylists(res.items);
      });
    }
  }, [userID]);

  useEffect(() => {
    getFeaturedPlaylists().then((res) => {
      setFeaturedPlaylists(res.playlists.items);
    });
  }, []);

  return (
    <div className="px-6 ">
      <div className="flex flex-row items-center mb-3 pb-10">
        <div className="flex-grow">
          <span className="text-5xl md:text-7xl text-center text-[#363636] font-semibold ">
            Your Playlists
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-y-4 gap-x-4">
        {playlists &&
          playlists.map((item: any) => (
            <div
              key={uniqueId()}
              className="flex flex-col items-center justify-center w-full h-full"
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
              <p className="w-full h-full py-3 text-center text-white bg-[#202023]">
                {item.name}
              </p>
            </div>
          ))}
      </div>
      <div className="flex flex-row items-center pb-10 pt-5 border-b-2 border-[#525252]">
        <div className="flex-grow">
          <span className="text-5xl md:text-7xl text-center text-[#363636] font-semibold ">
            Featured Playlists
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-x-4 gap-y-4">
        {featuredPlaylists &&
          featuredPlaylists.map((item: any) => (
            <div
              key={uniqueId()}
              className="flex flex-col items-center justify-center h-full w-full"
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
              <p className="text-white w-full py-3 text-center border-1 bg-[#202023]">
                {item.name}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
