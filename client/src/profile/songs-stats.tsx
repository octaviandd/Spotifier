/** @format */

import React, { ReactElement } from "react";

interface Props {}

export default function SongStats({}: Props): ReactElement {
  return (
    <div className="flex w-full justify-center pt-5">
      <div className="container">
        <div>
          <span className="text-4xl font-mono">Favourite Songs</span>
        </div>
        <div>
          <p>Filters</p>
          <select></select>
          <button></button>
        </div>
      </div>
    </div>
  );
}
