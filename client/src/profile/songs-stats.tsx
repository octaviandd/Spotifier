/** @format */

import React, { ReactElement } from "react";

interface Props {
  width: number;
}

export default function SongStats({ width }: Props): ReactElement {
  return (
    <div className="flex justify-center pt-5" style={{ width: width }}>
      <div>
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
