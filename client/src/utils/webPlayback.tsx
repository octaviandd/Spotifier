/** @format */

import React, { useEffect, useState } from "react";
declare const window: any;

type Props = { accessToken: string };

export default function WebPlayback({ accessToken }: Props) {
  const [player, setPlayer] = useState();
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const track = {
    name: "",
    album: {
      images: [{ url: "" }],
    },
    artists: [{ name: "" }],
  };

  const [current_track, setTrack]: any = useState(track);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: () => accessToken,
        volume: 0.5,
      });

      setPlayer(player);

      console.log(player);

      player.addListener("ready", ({ device_id }: any) => {
        console.log("Ready with Device ID", device_id);
      });

      player.addListener("initialization_error", ({ message }: any) => {
        console.error(message);
      });
      player.addListener("authentication_error", ({ message }: any) => {
        console.error(message);
      });
      player.addListener("account_error", ({ message }: any) => {
        console.error(message);
      });
      player.addListener("playback_error", ({ message }: any) => {
        console.error(message);
      });

      player.addListener("not_ready", ({ device_id }: any) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.connect();

      player.addListener("player_state_changed", (state: any) => {
        console.log(state);
        if (!state) {
          return;
        }

        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        player.getCurrentState().then((state: any) => {
          !state ? setActive(false) : setActive(true);
        });
      });
    };
  }, []);

  return (
    <>
      <div className="container">
        <div className="main-wrapper">
          <img
            src={current_track.album.images[0].url}
            className="now-playing__cover"
            alt=""
          />

          <div className="now-playing__side">
            <div className="now-playing__name">{current_track.name}</div>

            <div className="now-playing__artist">
              {current_track.artists[0].name}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
