/** @format */

import React, {
  ReactElement,
  useEffect,
  useState,
  useRef,
  Suspense,
} from "react";
import {
  getTracksAudioFeatures,
  getUserTopTracks,
} from "../../utils/SpotifyAPI";
import { v4 as uuidv4 } from "uuid";
import { aggregateValues, useIsVisible } from "../../utils/utils";
import {
  TemposChart,
  LoudnessChart,
  CharacteristicsChart,
} from "../../utils/BarCharts";
import { getItemsID } from "../../utils/utils";

const LazySongDataInputs = React.lazy(
  () => import("../../utils/SongsDataInput")
);
const SongCard = React.lazy(() => import("../../utils/SongCard"));
// const LazyTemposChart = React.lazy(() => import("../utils/barCharts"))

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
        <div className="flex flex-row items-center pb-10 pt-5 border-b-2 border-[#525252]">
          <div className="flex-grow">
            <span className="text-4xl">Favorite Songs</span>
          </div>
          <div className="flex flex-grow justify-end">
            <select
              value={timeRange}
              name="Date"
              onChange={(e) => handleTimeRange(e.target.value)}
              className="py-3 px-5 rounded-md text-black"
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
                  <Suspense fallback={<></>}>
                    <SongCard
                      item={item}
                      count={state.items.indexOf(item)}
                    ></SongCard>
                  </Suspense>
                </React.Fragment>
              );
            })}
          </div>
        ) : (
          <div>wait</div>
        )}
      </div>
      <div className="relative w-full h-full">
        <div className="flex flex-row border-b-2 border-[#525252] pb-10 pt-5">
          <div className="flex-grow">
            <span className="text-4xl ">Songs Stats</span>
          </div>
          <div className="flex flex-grow justify-end">
            <select
              value={timeRange}
              name="Date"
              onChange={(e) => handleTimeRange(e.target.value)}
              className="py-3 px-5 rounded-md text-black"
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
              <span className="text-[#1DB954] text-center font-bold">
                Spotify{" "}
              </span>
              describes a song in numbers.
            </span>
          </div>
          <div className="col-span-3 flex flex-col  ">
            <div className="bg-[#ededed] h-[30px] p-[16px] flex gap-1 items-center shadow-lg rounded-tl-md rounded-tr-md">
              <div className="w-[12px] h-[12px] bg-[#FF605C] inline-block rounded-full"></div>
              <div className="w-[12px] h-[12px] bg-[#FFBD44] inline-block rounded-full"></div>
              <div className="w-[12px] h-[12px] bg-[#00CA4E] inline-block rounded-full"></div>
            </div>
            <div className="flex flex-col pl-5 bg-white text-black">
              <span>{"{"}</span>
              <span className="pl-5">
                danceability: <span className="text-teal-500">".67"</span>{" "}
              </span>
              <span className="pl-5">
                valence: <span className="text-teal-500">".22"</span>
              </span>
              <span className="pl-5">
                instrumentalness: <span className="text-teal-500">".77"</span>
              </span>
              <span className="pl-5">
                acousticness: <span className="text-teal-500">".45"</span>
              </span>
              <span className="pl-5">
                energy: <span className="text-teal-500">".88"</span>
              </span>
              <span className="pl-5">
                speechiness: <span className="text-teal-500">".34"</span>
              </span>
              <span className="pl-5">
                liveness: <span className="text-teal-500">".12"</span>
              </span>
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
              <div className="flex items-center bg-[#D9DADA] rounded-2xl w-full p-3 drop-shadow-xl text-black">
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
          <Suspense fallback={<div>wait</div>}>
            <div className="flex flex-wrap pt-10">
              <div className="h-[21rem] w-full flex items-center col-start-1">
                <LoudnessChart
                  loudnessValues={state.loudnessValues}
                ></LoudnessChart>
              </div>
              <div className="h-[21rem] w-full flex items-center col-start-2">
                <TemposChart tempoValues={state.tempoValues}></TemposChart>
              </div>
            </div>
          </Suspense>
        </div>
      </div>
      <div>
        <Suspense fallback={<div>waiting</div>}>
          <LazySongDataInputs
            accessToken={accessToken}
            initialArtists={state.items.slice(0, 3)}
          ></LazySongDataInputs>
        </Suspense>
      </div>
    </div>
  );
}
