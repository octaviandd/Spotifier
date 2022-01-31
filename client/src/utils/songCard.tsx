/** @format */

import React, {
  ReactElement,
  useState,
  useEffect,
  useRef,
  useMemo,
} from "react";
import SpotifyLogo from "../../images/spotify.png";

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
  const [play, setPlay] = useState(false);
  // let audioRef = useRef(new Audio(item.preview_url));
  console.log(item.album.images);

  // useEffect(() => {
  //   if (play) {
  //     audioRef.current.play();
  //   } else {
  //     audioRef.current.pause();
  //   }
  // }, [play]);

  return (
    <div className="flex mt-4 py-2 items-center shadow-lg">
      <div className="px-3 font-md">{count + 1}</div>
      <div>
        <img
          srcSet=""
          src={
            (item.album.images[2] && item.album.images[2].url) || SpotifyLogo
          }
          width="64"
          height="64"
        ></img>
      </div>
      <div className="flex flex-col py-2 px-5">
        <span className="text-[#4a4a4a] font-bold">{item.name}</span>
        <span className="text-slate-400 text-sm">
          {item.album.artists[0].name}
        </span>
      </div>
      <div className="flex flex-grow justify-end mr-2">
        <div
          className="cursor-pointer p-3 bg-[#1DB954] rounded-md justify-end"
          onClickCapture={() => setPlay(true)}
          onMouseLeave={() => setPlay(false)}
        >
          {/* <audio preload="true">
            {item.preview_url && <source src={item.preview_url} />}
          </audio> */}
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </div>
      <div className="flex ml-auto flex-shrink text-[#4a4a4a] pr-2">
        {millisecondsToMinutesAndSeconds(item.duration_ms)}
      </div>
    </div>
  );
}
