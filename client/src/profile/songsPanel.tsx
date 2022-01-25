/** @format */

import React, { ReactElement, useEffect, useState, useRef } from "react";
import SongCard from "../utils/songCard";
import {
  getTracksAudioFeatures,
  getUserTopTracks,
  useIsVisible,
} from "../utils/utils";
import { v4 as uuidv4 } from "uuid";
import { aggregateValues } from "../utils/valuesAggregator";
import {
  TemposChart,
  LoudnessChart,
  CharacteristicsChart,
} from "../utils/barCharts";
import { getItemsID } from "../utils/filterIds";
import SongsDataInputs from "../utils/songsDataInputs";

interface Props {
  accessToken: string;
}

export default function SongsPanel({ accessToken }: Props): ReactElement {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("medium_term");
  const [state, setState] = useState({
    items: [],
    itemsIds: [],
    aggregatedAudioValues: [],
    tempoValues: undefined,
    loudnessValues: undefined,
  });

  const elemRef = useRef();
  const isVisible = useIsVisible(elemRef);

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
  }, [timeRange]);

  useEffect(() => {
    const getAudio = () => {
      try {
        setLoading(true);
        getTracksAudioFeatures(accessToken, state.itemsIds).then((res) => {
          setState((prevState) => ({
            ...prevState,
            aggregatedAudioValues: aggregateValues(res.audio_features, []).data,
            tempoValues: aggregateValues(res.audio_features, state.items)
              .secondaryData.tempoData,
            loudnessValues: aggregateValues(res.audio_features, [])
              .secondaryData.loudnessData,
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
      <div className="mb-10 h-full min-h-min">
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
        <div className="grid grid-cols-6 my-10">
          <div className="col-span-3">
            <span className="text-6xl">
              That's how{" "}
              <span className="text-[#1DB954] text-center">Spotify </span>
              describes a song in numbers.
            </span>
          </div>
          <div className="col-span-3 flex flex-col shadow-lg rounded-tl-md rounded-tr-md">
            <div className="bg-[#ededed] h-[30px] p-[16px] rounded-md flex gap-1 items-center">
              <div className="w-[12px] h-[12px] bg-[#FF605C] inline-block rounded-full"></div>
              <div className="w-[12px] h-[12px] bg-[#FFBD44] inline-block rounded-full"></div>
              <div className="w-[12px] h-[12px] bg-[#00CA4E] inline-block rounded-full"></div>
            </div>
            <div className="flex flex-col pl-5">
              <span>{"{"}</span>
              <span className="pl-5">danceability: ".67" </span>
              <span className="pl-5">valence: ".22"</span>
              <span className="pl-5">instrumentalness: ".77"</span>
              <span className="pl-5">acousticness: ".45"</span>
              <span className="pl-5">energy: ".88"</span>
              <span className="pl-5">speechiness: ".34"</span>
              <span className="pl-5">liveness: ".12"</span>
              <span>{"}"}</span>
            </div>
          </div>
        </div>
        <div
          className="flex flex-col items-center justify-center h-[34rem]"
          ref={elemRef}
        >
          <div className="text-6xl text-center my-10">
            Here's how your average song looks like.
          </div>
          {state.aggregatedAudioValues.length > 1 && (
            <CharacteristicsChart
              characteristicsValues={state.aggregatedAudioValues}
            ></CharacteristicsChart>
          )}
        </div>
        <div className="my-5">
          <div className="grid grid-cols-3 grid-rows-2">
            <span className="text-6xl col-start-1 row-start-1 col-end-3">
              Remember this?
            </span>
            <div className="col-start-2 row-start-2">
              <div className="flex items-center bg-[#D9DADA] rounded-2xl w-full p-3 drop-shadow-xl">
                <span className="bg-[#F80E4B] p-3 rounded-md inline-block">
                  <svg
                    // fill="#F80E4B"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="#fff"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <div className="flex flex-col pl-4">
                  <span className="font-semibold">
                    Volume Should Be Turned Down
                  </span>
                  <span className="font-thin">
                    Based on your headphone usage over the last seven days,
                    you've exceeded the recommended limit.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="h-[26rem] w-full flex items-center col-start-1">
              <LoudnessChart
                loudnessValues={state.loudnessValues}
              ></LoudnessChart>
            </div>
            <div className="h-[26rem] w-full flex items-center col-start-2">
              <TemposChart tempoValues={state.tempoValues}></TemposChart>
            </div>
          </div>
        </div>
      </div>
      <div>
        <SongsDataInputs
          accessToken={accessToken}
          initialArtists={state.items.slice(0, 3)}
        ></SongsDataInputs>
      </div>
    </div>
  );
}
