/** @format */

import React, { ReactElement } from "react";
import img from "../assets/wave.png";

interface Props {}

export default function HomapageHero({}: Props): ReactElement {
  return (
    <div className="flex align-center relative">
      <div className="flex">
        <span className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 py-2">
          <p className="text-7xl font-mono py-2">Harmony</p>
          <p className="text-xl font-mono py-2">
            Check your Spotify music data.
          </p>
        </span>
        <img className="object-cover" src={img}></img>
      </div>
    </div>
  );
}
