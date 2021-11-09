/** @format */

import React, { ReactElement, useState, useEffect } from "react";
import { getMe } from "../utils/utils";
import SpotifyIcon from "../assets/spotify.png";

interface Props {}

export default function ProfileStats({}: Props): ReactElement {
  const [state, setState] = useState({
    token: "",
    name: "",
    email: "",
    profileLink: "",
    avatar: "",
    country: "",
    status: "",
  });
  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("token"));
    getMe(token).then((data) => {
      setState((prevState) => ({
        ...prevState,
        name: data.display_name,
        country: data.country,
        email: data.email,
        profileLink: data.external_urls.spotify,
        avatar: data.images[0].url,
        status: data.product,
      }));
    });
  }, []);
  return (
    <section className="flex justify-center drop-shadow-lg">
      <div className="flex justify-center gap-10 w-3/4 mt-32 p-5 rounded-lg items-center border-solid border-2 border-black">
        <div className="text-xl">
          <div>
            <img src={state.avatar}></img>
          </div>
        </div>
        <div className="text-xl">
          <div className="py-2">
            <p>
              Name: <span className="font-bold">{state.name}</span>
            </p>
          </div>
          <div className="py-2">
            <p>
              Email: <span className="font-bold">{state.email}</span>
            </p>
          </div>
          <div className="py-2">
            <p>
              Country: <span className="font-bold">{state.country}</span>
            </p>
          </div>
          <div className="py-2">
            <p>
              Status:{" "}
              <span className="text-spotify font-bold">
                {state.status.toUpperCase()}
              </span>
            </p>
          </div>
          <div className="py-2">
            <a href={state.profileLink}>
              <img src={SpotifyIcon} width="40px"></img>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
