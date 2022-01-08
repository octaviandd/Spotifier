/** @format */

import React, { ReactElement, useEffect, useState } from "react";
import SongCard from "../utils/song-card";
import { getUserTopTracks } from "../utils/utils";

interface Props {
  width: number;
}

export default function SongStats({ width }: Props): ReactElement {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    items: [],
  });

  useEffect(() => {
    const get = () => {
      const token = JSON.parse(window.localStorage.getItem("token"));
      try {
        setLoading(true);
        getUserTopTracks(token).then((res) => {
          setState((prevState) => ({
            ...prevState,
            items: res.items,
          }));
        });
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    get();
  }, [loading]);

  return (
    <div className="flex justify-center pt-5 px-5" style={{ width: width }}>
      <div>
        <div>
          <span className="text-4xl font-mono">Favorite Songs</span>
        </div>
        <div>
          <p>Filters</p>
          {/* <select value="Date" name="Date">
            <option>Please choose an option</option>
            <option>Last Month</option>
            <option>Last Six Months</option>
            <option>Last Year</option>
          </select> */}
          <button></button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {state.items.map((item) => {
            return (
              <>
                <SongCard
                  item={item}
                  count={state.items.indexOf(item)}
                  key={Date.now()}
                ></SongCard>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
