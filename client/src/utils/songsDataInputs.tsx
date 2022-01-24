/** @format */

import React, { ReactElement, useState, useRef, useEffect } from "react";
import { getRecommendedSongs } from "../utils/utils";
import round from "lodash.round";
import { v4 as uuidv4 } from "uuid";

interface Props {
  accessToken: string;
}

function roundedToFixed(input: number, digits: number) {
  var rounded = Math.pow(10, digits);
  return (Math.round(input * rounded) / rounded).toFixed(digits);
}

export default function SongsDataInputs({ accessToken }: Props): ReactElement {
  const [danceability, setDanceability] = useState(0.5);
  const [energy, setEnergy] = useState(0.5);
  const [speechiness, setSpeechines] = useState(0.5);
  const [acousticness, setAcousticness] = useState(0.5);
  const [loudness, setLoudness] = useState(0.5);
  const [valence, setValence] = useState(0.5);
  const [instrumentalness, setInstrumentalness] = useState(0.5);
  const [liveness, setLiveness] = useState(0.5);

  const [isActive, setActive] = useState(false);
  const [seedGenres, changeGenres] = useState([
    "dance",
    "hip-hop",
    "pop",
    "summer",
  ]);

  const ref = useRef();

  const [items, setItems] = useState(undefined);

  useEffect(() => {
    try {
      getRecommendedSongs(accessToken, seedGenres, {
        danceability,
        energy,
        speechiness,
        acousticness,
        loudness,
        valence,
        instrumentalness,
        liveness,
      }).then((res) => {
        console.log(res);
        setItems(res);
      });
    } catch (error) {
      console.log(error);
    }
  }, [danceability, energy, speechiness, acousticness, loudness, valence]);

  return (
    <div className="grid grid-cols-7 col-row-4 drop-shadow-md rounded-xl bg-[#fff]">
      <div className="col-start-1 col-end-7 flex flex-col items-center h-full ">
        <div className="w-full">
          <div className="bg-[#ededed] h-[30px] p-[16px] rounded-md flex gap-1 items-center w-full">
            <div className="w-[12px] h-[12px] bg-[#FF605C] inline-block rounded-full"></div>
            <div className="w-[12px] h-[12px] bg-[#FFBD44] inline-block rounded-full"></div>
            <div className="w-[12px] h-[12px] bg-[#00CA4E] inline-block rounded-full"></div>
          </div>
        </div>
        <div className="flex flex-row w-full space-x-3 px-2 py-4">
          <div className="flex flex-col items-center justify-center">
            <span className="font-bold">Danceability</span>
            <div className="flex justify-center items-center rounded-lg drop-shadow-md bg-[#D9DADA] text-[#747474]">
              <button
                className="p-2 text-lg"
                onClick={() =>
                  setDanceability(round(Number(danceability - 0.1), 1))
                }
              >
                -
              </button>
              <input
                className="w-2/12 text-center"
                name="danceability"
                defaultValue={danceability}
                max={1}
                min={0}
              ></input>
              <button
                className="p-2 text-lg"
                onClick={() =>
                  setDanceability(round(Number(danceability + 0.1), 1))
                }
              >
                +
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span>Energy</span>
            <div className="flex justify-center items-center rounded-lg drop-shadow-md bg-[#fff] text-[#747474]">
              <button
                className="p-2 text-lg"
                onClick={() => setEnergy(round(Number(danceability - 0.1), 1))}
              >
                -
              </button>
              <input
                className="w-2/12 text-center"
                name="danceability"
                defaultValue={energy}
              ></input>
              <button
                className="p-2 text-lg"
                onClick={() => setEnergy(round(Number(danceability + 0.1), 1))}
              >
                +
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span>Speechiness</span>
            <div className="flex justify-center items-center rounded-lg drop-shadow-md bg-[#fff] text-[#747474]">
              <button
                className="p-2 text-lg"
                onClick={() =>
                  setSpeechines(round(Number(danceability - 0.1), 1))
                }
              >
                -
              </button>
              <input
                className="text-center w-2/12"
                name="speechiness"
                defaultValue={speechiness}
              ></input>
              <button
                className="p-2 text-lg"
                onClick={() =>
                  setSpeechines(round(Number(danceability + 0.1), 1))
                }
              >
                +
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span>Acousticness</span>
            <div className="flex justify-center items-center rounded-lg drop-shadow-md bg-[#fff] text-[#747474]">
              <button
                className="p-2 text-lg"
                onClick={() =>
                  setAcousticness(round(Number(danceability - 0.1), 1))
                }
              >
                -
              </button>
              <input
                className="text-center w-2/12"
                name="acousticness"
                defaultValue={acousticness}
              ></input>
              <button
                className="p-2 text-lg"
                onClick={() =>
                  setAcousticness(round(Number(danceability + 0.1), 1))
                }
              >
                +
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span>Loudness</span>
            <div className="flex justify-center items-center rounded-lg drop-shadow-md bg-[#fff] text-[#747474]">
              <button
                className="p-2 text-lg"
                onClick={() =>
                  setLoudness(round(Number(danceability - 0.1), 1))
                }
              >
                -
              </button>
              <input
                className="text-center w-2/12"
                name="loudness"
                defaultValue={loudness}
              ></input>
              <button
                className="p-2 text-lg"
                onClick={() =>
                  setLoudness(round(Number(danceability + 0.1), 1))
                }
              >
                +
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span>Valence</span>
            <div className="flex justify-center items-center rounded-lg drop-shadow-md bg-[#fff] text-[#747474]">
              <button
                className="p-2 text-lg"
                onClick={() => setValence(round(Number(danceability - 0.1), 1))}
              >
                -
              </button>
              <input
                className="text-center w-2/12"
                name="valence"
                defaultValue={valence}
              ></input>
              <button
                className="p-2 text-lg"
                onClick={() => setValence(round(Number(danceability + 0.1), 1))}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-start-1 row-start-2 py-3 px-3">
        <span className="font-semibold text-xl">Artists</span>
        <input type="text" placeholder="Search for artists.."></input>
        <div></div>
      </div>
      <div className="col-start-1 row-start-3 py-3 px-3">
        <span className="font-semibold text-xl">Genres</span>
        <input type="text" placeholder="Search for genres.."></input>
        <div></div>
      </div>
      {items && (
        <div className="py-5 flex flex-wrap justify-center items-center col-start-1 col-end-7 row-start-4">
          {items.tracks.map((track: any) => (
            <div key={uuidv4()} className="w-[60px] h-[60px] pr-3 relative">
              <div
                className="absolute w-[60px] h-[60px] transition-all bg-cover"
                style={{ backgroundImage: `url(${track.album.images[0].url})` }}
              ></div>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`${track.external_urls.spotify}`}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden hover:block"
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
  );
}
