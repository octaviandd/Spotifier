/** @format */

import React, { ReactElement, useEffect, useState } from "react";
import Navbar from "./navbar";
import HomepageHero from "./homepage-hero";
import Profile from "../profile/profile";
interface Props {}

export default function Homepage({}: Props): ReactElement {
  const [state, setState] = useState({
    isLogged: false,
  });
  useEffect(() => {
    if (window.location.hash !== "") {
      setState((prevState) => ({
        ...prevState,
        isLogged: true,
      }));
      let hash: string | undefined = window.location.hash;
      let hashValues: string[] = hash.substring(1).split("&");

      let access_token: string = hashValues[0].split("=")[1];
      let accces_state: string = hashValues[3].split("=")[1];

      window.localStorage.setItem("token", JSON.stringify(access_token));
    }
  }, [window.location.hash]);
  return (
    <div>
      {!window.location.hash ? (
        <>
          <Navbar></Navbar>
          <HomepageHero></HomepageHero>
        </>
      ) : (
        <>
          <Profile></Profile>
        </>
      )}
    </div>
  );
}
