/** @format */

import React, { ReactElement, useState } from "react";

interface Props {
  item: any;
  count: number;
}

function millisecondsToMinutesAndSeconds(milliseconds: number) {
  var minutes = Math.floor(milliseconds / 60000);
  var seconds = ((milliseconds % 60000) / 1000).toFixed(0);
  return Number(seconds) == 60
    ? minutes + 1 + ":00"
    : minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds;
}

export default function SongCard({ item, count }: Props): ReactElement {
  return (
    <div className="flex mt-4 items-center">
      <div className="px-3 font-md">{count + 1}</div>
      <div>
        <img
          src={item.album.images[2] && item.album.images[2].url}
          width="64"
          height="64"
        ></img>
      </div>
      <div className="flex flex-col py-2 px-5">
        <span className="">{item.name}</span>
        <span className="text-slate-400 text-sm">
          {item.album.artists[0].name}
        </span>
      </div>
      <div className="flex ml-auto">
        {millisecondsToMinutesAndSeconds(item.duration_ms)}
      </div>
    </div>
  );
}
