/** @format */

import React, { ReactElement, useState, useRef, useEffect } from "react";
import { getRecommendedSongs } from "./SpotifyAPI";
import round from "lodash.round";
import { v4 as uuidv4 } from "uuid";
import SearchDropDown from "./SearchDropDown";

interface Props {}

export default function SongsDataInputs({}: Props): ReactElement {
  const [danceability, setDanceability] = useState(0.5);
  const [energy, setEnergy] = useState(0.5);
  const [speechiness, setSpeechines] = useState(0.5);
  const [acousticness, setAcousticness] = useState(0.5);
  const [loudness, setLoudness] = useState(0.5);
  const [valence, setValence] = useState(0.5);
  const [instrumentalness, setInstrumentalness] = useState(0.5);
  const [liveness, setLiveness] = useState(0.5);
  const [searchValue, setSearchValue] = useState("");

  const [currentlyHeldArtists, setCurrentArtists] = useState([]);
  const [items, setItems] = useState(undefined);

  const handleRemove = (id: string) => {
    const newList = currentlyHeldArtists.filter((item) => item.id !== id);
    setCurrentArtists(newList);
  };

  useEffect(() => {
    if (currentlyHeldArtists.length > 0) {
      try {
        getRecommendedSongs(
          currentlyHeldArtists.map((item) => item.id),
          {
            danceability,
            energy,
            speechiness,
            acousticness,
            loudness,
            valence,
            instrumentalness,
            liveness,
          }
        ).then((res) => {
          setItems(res);
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      setItems(undefined);
    }
  }, [
    danceability,
    energy,
    speechiness,
    acousticness,
    loudness,
    valence,
    currentlyHeldArtists,
  ]);

  return (
    <div className="pt-10">
      <div className="pb-6">
        <h1 className="text-5xl md:text-7xl text-[#363636] font-semibold">
          Search songs based on{" "}
          <span className="text-[#1DB954] font-bold">characteristics</span> and{" "}
          <span className="text-[#1DB954] font-bold">artist similarity</span>
        </h1>
      </div>
      <div className="grid grid-cols-7 grid-row-5 drop-shadow-md rounded-xl bg-[#fff]">
        <div className="w-full col-start-1 col-end-8 row-start-1">
          <div className="bg-[#ededed] h-[30px] p-[16px] rounded-md flex gap-1 items-center w-full">
            <div className="w-[12px] h-[12px] bg-[#FF605C] inline-block rounded-full"></div>
            <div className="w-[12px] h-[12px] bg-[#FFBD44] inline-block rounded-full"></div>
            <div className="w-[12px] h-[12px] bg-[#00CA4E] inline-block rounded-full"></div>
          </div>
        </div>
        <div className="row-start-2 col-start-1 col-end-8 flex flex-col items-center h-full ">
          <div className="flex flex-row w-auto lg:w-full flex-wrap space-x-3 px-2 py-4">
            <div className="flex flex-col items-center justify-center text-black">
              <span className="font-bold">Danceability</span>
              <div className="flex justify-center items-center rounded-lg drop-shadow-md bg-[#fff] text-[#747474]">
                <button
                  className="p-2 text-lg"
                  onClick={() => {
                    if (danceability > 0) {
                      setDanceability(round(Number(danceability - 0.1), 1));
                    }
                  }}
                >
                  -
                </button>
                <input
                  readOnly
                  className="w-2/12 text-center"
                  name="danceability"
                  value={danceability}
                  max={1}
                  min={0}
                ></input>
                <button
                  className="p-2 text-lg"
                  onClick={() => {
                    if (danceability < 1) {
                      setDanceability(round(Number(danceability + 0.1), 1));
                    }
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center text-black">
              <span className="font-bold">Energy</span>
              <div className="flex justify-center items-center rounded-lg drop-shadow-md bg-[#fff] text-[#747474]">
                <button
                  className="p-2 text-lg"
                  onClick={() => {
                    if (energy > 0) {
                      setEnergy(round(Number(energy - 0.1), 1));
                    }
                  }}
                >
                  -
                </button>
                <input
                  readOnly
                  className="w-2/12 text-center"
                  name="danceability"
                  value={energy}
                ></input>
                <button
                  className="p-2 text-lg"
                  onClick={() => {
                    if (energy < 1) {
                      setEnergy(round(Number(energy + 0.1), 1));
                    }
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center text-black">
              <span className="font-bold">Speechiness</span>
              <div className="flex justify-center items-center rounded-lg drop-shadow-md bg-[#fff] text-[#747474]">
                <button
                  className="p-2 text-lg"
                  onClick={() => {
                    if (speechiness > 0) {
                      setSpeechines(round(Number(speechiness - 0.1), 1));
                    }
                  }}
                >
                  -
                </button>
                <input
                  readOnly
                  className="text-center w-2/12"
                  name="speechiness"
                  value={speechiness}
                ></input>
                <button
                  className="p-2 text-lg"
                  onClick={() => {
                    if (speechiness < 1) {
                      setSpeechines(round(Number(speechiness + 0.1), 1));
                    }
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center text-black">
              <span className="font-bold">Acousticness</span>
              <div className="flex justify-center items-center rounded-lg drop-shadow-md bg-[#fff] text-[#747474]">
                <button
                  className="p-2 text-lg"
                  onClick={() => {
                    if (acousticness > 0)
                      setAcousticness(round(Number(acousticness - 0.1), 1));
                  }}
                >
                  -
                </button>
                <input
                  readOnly
                  className="text-center w-2/12"
                  name="acousticness"
                  value={acousticness}
                ></input>
                <button
                  className="p-2 text-lg"
                  onClick={() => {
                    if (acousticness < 1)
                      setAcousticness(round(Number(acousticness + 0.1), 1));
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center  text-black">
              <span className="font-bold">Loudness</span>
              <div className="flex justify-center items-center rounded-lg drop-shadow-md bg-[#fff] text-[#747474]">
                <button
                  className="p-2 text-lg"
                  onClick={() => {
                    if (loudness > 0)
                      setLoudness(round(Number(loudness - 0.1), 1));
                  }}
                >
                  -
                </button>
                <input
                  readOnly
                  className="text-center w-2/12"
                  name="loudness"
                  value={loudness}
                ></input>
                <button
                  className="p-2 text-lg"
                  onClick={() => {
                    if (loudness < 1)
                      setLoudness(round(Number(loudness + 0.1), 1));
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center text-black">
              <span className="font-bold">Valence</span>
              <div className="flex justify-center items-center rounded-lg drop-shadow-md bg-[#fff] text-[#747474]">
                <button
                  className="p-2 text-lg"
                  onClick={() => {
                    if (valence > 0)
                      setValence(round(Number(valence - 0.1), 1));
                  }}
                >
                  -
                </button>
                <input
                  readOnly
                  className="text-center w-2/12"
                  name="valence"
                  value={valence}
                ></input>
                <button
                  className="p-2 text-lg"
                  onClick={() => {
                    if (valence < 1)
                      setValence(round(Number(valence + 0.1), 1));
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full row-start-3 py-3 px-3 col-start-1 col-end-8">
          <div className="relative flex items-center w-full flex-col lg:flex-row">
            <div className="relative flex flex-col items-center">
              <span className="font-semibold text-xl pb-4 pl-3 text-black">
                Artists
              </span>
              <input
                type="text"
                placeholder="Search for artists.."
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
                className="relative leading-[20px] rounded-md border-1 border-[#dbdbdb] bg-[#fafafa] pr-[10px] py-[3px] pl-[24px]  text-black"
              ></input>
              <span
                className="absolute opacity-1 top-[45px] right-[3px] cursor-pointer"
                onClick={() => setSearchValue("")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className=" rounded-full w-6 h-6 py-[1px] p-[3px] "
                  viewBox="0 0 20 20"
                  fill="black"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
            <div className="flex flex-grow ml-5">
              {searchValue !== "" && (
                <SearchDropDown
                  searchValue={searchValue}
                  setCurrentArtists={setCurrentArtists}
                />
              )}
            </div>
          </div>
          {currentlyHeldArtists.length > 0 && (
            <div className="flex flex-wrap w-full flex-grow flex-row space-x-3 py-4">
              {currentlyHeldArtists.map((item: any) => (
                <div
                  key={uuidv4()}
                  className="flex items-center border border-[#dbdbdb] bg-zinc-100 rounded-xl px-3 py-2"
                >
                  <span className="whitespace-nowrap text-[#202023]">
                    {item.name}
                  </span>
                  <span
                    className="cursor-pointer"
                    id={item.id}
                    onClick={() => handleRemove(item.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className=" rounded-full w-6 h-6 py-[1px] p-[3px] "
                      viewBox="0 0 20 20"
                      fill="black"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        {items && (
          <div className="py-5 flex flex-wrap justify-center items-center col-start-1 col-end-7 row-start-5">
            {items.tracks.map((track: any) => (
              <div key={uuidv4()} className="w-[60px] h-[60px] pr-3 relative">
                <div
                  className="absolute w-[60px] h-[60px] transition-all bg-cover"
                  style={{
                    backgroundImage: `url(${track.album.images[0].url})`,
                  }}
                ></div>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`${track.external_urls.spotify}`}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden hover:block cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    x="0px"
                    y="0px"
                    width="24px"
                    height="24px"
                    viewBox="0 0 427.652 427.652"
                    xmlSpace="preserve"
                    fill="#1EB954"
                  >
                    <path d="M213.826,0C95.733,0,0,95.733,0,213.826s95.733,213.826,213.826,213.826 s213.826-95.733,213.826-213.826S331.919,0,213.826,0z M306.886,310.32c-2.719,4.652-7.612,7.246-12.638,7.247 c-2.506,0-5.044-0.645-7.364-2c-38.425-22.456-82.815-26.065-113.295-25.138c-33.763,1.027-58.523,7.692-58.769,7.76 c-7.783,2.126-15.826-2.454-17.961-10.236c-2.134-7.781,2.43-15.819,10.209-17.962c1.116-0.307,27.76-7.544,64.811-8.766 c21.824-0.72,42.834,0.801,62.438,4.52c24.83,4.71,47.48,12.978,67.322,24.574C308.612,294.393,310.96,303.349,306.886,310.32z M334.07,253.861c-3.22,5.511-9.016,8.583-14.97,8.584c-2.968,0-5.975-0.763-8.723-2.369c-45.514-26.6-98.097-30.873-134.2-29.776 c-39.994,1.217-69.323,9.112-69.614,9.192c-9.217,2.515-18.746-2.906-21.275-12.124c-2.528-9.218,2.879-18.738,12.093-21.277 c1.322-0.364,32.882-8.937,76.77-10.384c25.853-0.852,50.739,0.949,73.96,5.354c29.412,5.58,56.241,15.373,79.744,29.108 C336.115,234.995,338.897,245.603,334.07,253.861z M350.781,202.526c-3.641,0-7.329-0.936-10.7-2.906 c-108.207-63.238-248.572-25.643-249.977-25.255c-11.313,3.117-23.008-3.527-26.124-14.839 c-3.117-11.312,3.527-23.008,14.839-26.124c1.621-0.447,40.333-10.962,94.166-12.737c31.713-1.044,62.237,1.164,90.72,6.567 c36.077,6.844,68.987,18.856,97.815,35.704c10.13,5.92,13.543,18.931,7.623,29.061C365.193,198.757,358.084,202.526,350.781,202.526 z"></path>
                  </svg>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
