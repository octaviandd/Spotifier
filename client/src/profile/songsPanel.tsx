/** @format */

import React, { ReactElement, useEffect, useState } from "react";
import SongCard from "../utils/songCard";
import { getTracksAudioFeatures, getUserTopTracks } from "../utils/utils";
import { v4 as uuidv4 } from "uuid";
import { aggregateValues } from "../utils/valuesAggregator";
import {
  TemposChart,
  LoudnessChart,
  CharacteristicsChart,
} from "../utils/barCharts";
import { getItemsID } from "../utils/filterIds";

interface Props {
  accessToken: string;
}

export default function SongsPanel({ accessToken }: Props): ReactElement {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("medium_term");
  const [state, setState] = useState({
    items: [],
    itemsIds: [],
    itemsAudio: undefined,
    aggregatedAudioValues: [],
    tempoValues: undefined,
    loudnessValues: undefined,
  });

  const handleTimeRange = (e: string) => {
    setTimeRange(e);
  };

  useEffect(() => {
    const getTracks = () => {
      try {
        setLoading(true);
        getUserTopTracks(accessToken, timeRange).then((res) => {
          setState((prevState) => ({
            ...prevState,
            items: res.items,
            itemsIds: getItemsID(res.items),
          }));
        });
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    getTracks();
  }, [loading, timeRange]);

  useEffect(() => {
    const getAudio = () => {
      try {
        setLoading(true);
        getTracksAudioFeatures(accessToken, state.itemsIds).then((res) => {
          setState((prevState) => ({
            ...prevState,
            itemsAudio: res.audio_features,
            aggregatedAudioValues: aggregateValues(res.audio_features).data,
            tempoValues: aggregateValues(res.audio_features).secondaryData
              .tempoData,
            loudnessValues: aggregateValues(res.audio_features).secondaryData
              .loudnessData,
          }));
        });
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    getAudio();
  }, [state.items]);

  return (
    <div className="flex justify-center flex-col pt-5 px-6">
      <div className="mb-10">
        <div className="flex flex-row items-center pb-10 pt-5 border-b-2 border-grey-500">
          <div className="flex-grow">
            <span className="text-4xl font-mono">1. Favorite Songs</span>
          </div>
          <div className="flex-grow">
            <select
              value={timeRange}
              name="Date"
              onChange={(e) => handleTimeRange(e.target.value)}
              className="py-3 px-5 rounded-md"
            >
              <option value="short_term">Last Month</option>
              <option value="medium_term">Last Six Months</option>
              <option value="long_term">Last Year</option>
            </select>
            <button></button>
          </div>
        </div>
        {!loading ? (
          <div className="grid grid-cols-2">
            {state.items.map((item) => {
              return (
                <React.Fragment key={uuidv4()}>
                  <SongCard
                    item={item}
                    count={state.items.indexOf(item)}
                  ></SongCard>
                </React.Fragment>
              );
            })}
          </div>
        ) : (
          <div>wait</div>
        )}
      </div>
      <div className="relative w-full h-full">
        <div className="flex flex-row border-b-2 border-grey-500 pb-10 pt-5">
          <div className="flex-grow">
            <span className="text-4xl font-mono ">2. Songs Stats</span>
          </div>
          <div className="flex-grow">
            <select
              value={timeRange}
              name="Date"
              onChange={(e) => handleTimeRange(e.target.value)}
              className="py-3 px-5 rounded-md"
            >
              <option value="short_term">Last Month</option>
              <option value="medium_term">Last Six Months</option>
              <option value="long_term">Last Year</option>
            </select>
            <button></button>
          </div>
        </div>
        <div className="flex justify-center w-[34rem] h-[34rem]">
          {Object.keys(state.aggregatedAudioValues).length > 1 && (
            <CharacteristicsChart
              characteristicsValues={state.aggregatedAudioValues}
            ></CharacteristicsChart>
          )}
        </div>
        <div className="w-60 h-60 m-w-60 m-h-60">
          <TemposChart tempoValues={state.tempoValues}></TemposChart>
        </div>
        <div className="w-60 h-[36rem]">
          <LoudnessChart loudnessValues={state.loudnessValues}></LoudnessChart>
        </div>
      </div>
    </div>
  );
}
