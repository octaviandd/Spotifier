/** @format */

import React, { ReactElement, useState, useEffect } from "react";
import {
  getMe,
  getFollowedArtists,
  getRecommendedGenres,
} from "../utils/utils";
import SongStats from "./songs-stats";
import ArtistsStats from "./artists-stats";
import PlaylistStats from "./playlist-stats";
import ProfileStats from "./profile-stats";
import Navbar from "../home/navbar";

interface Props {}

export default function Profile({}: Props): ReactElement {
  const [state, setState] = useState({
    token: "",
    name: "",
    email: "",
    profileLink: "",
    avatar: "",
    profile: true,
    songsStats: false,
    playlistStats: false,
    artistsStats: false,
  });

  useEffect(() => {
    if (window.location.hash !== undefined) {
      let hash: string | undefined = window.location.hash;
      let hashValues: string[] = hash.substring(1).split("&");

      let access_token: string = hashValues[0].split("=")[1];
      let accces_state: string = hashValues[3].split("=")[1];

      setState((prevState) => ({
        ...prevState,
        token: access_token,
      }));
      window.localStorage.setItem("token", JSON.stringify(access_token));
      getMe(access_token).then((data) => {
        setState((prevState) => ({
          ...prevState,
          name: data.display_name,
          email: data.email,
          profileLink: data.external_urls.spotify,
          avatar: data.images[0].url,
        }));
      });
    }
  }, [window.location.hash]);

  return (
    <div className="flex">
      <Navbar isLogged={true}></Navbar>
      <ProfileStats></ProfileStats>
      <ArtistsStats></ArtistsStats>
    </div>
  );
}
