/** @format */

import React, { ReactElement, useState } from "react";

interface Props {
  item: any;
  count: number;
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
        <span>{item.name}</span>
        <span className="text-gray-700 text-sm">
          {item.album.artists[0].name}
        </span>
      </div>
    </div>
  );
}
