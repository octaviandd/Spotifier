/** @format */

import React, { useEffect, useState } from "react";
import { searchArtist } from "./SpotifyAPI";
import { v4 as uuidv4 } from "uuid";

type Props = {
  searchValue: string;
  accessToken: string;
  setCurrentArtists: any;
};

export default function SearchDropDown({
  searchValue,
  accessToken,
  setCurrentArtists,
}: Props) {
  const [artists, setArtists]: any = useState();

  const getListOfArtists = () => {
    searchArtist(accessToken, searchValue).then((res) => {
      setArtists(res.artists.items);
    });
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      getListOfArtists();
    }, 1000);

    return () => clearTimeout(timeOutId);
  }, [searchValue]);

  const [activeIndex, setActiveIndex] = useState(0);

  const updateIndex = (newIndex: number) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= artists.length / 4) {
      newIndex = artists.length / 4 - 1;
    }
    setActiveIndex(newIndex);
  };

  return (
    <div className="relative">
      {artists && (
        <div className="flex items-center justify-center">
          <button onClick={() => updateIndex(activeIndex - 1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="#202023"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="w-full h-20 overflow-hidden whitespace-nowrap px-5">
            <div
              className="w-[30rem] h-20 transition-all ease-in-out duration-300 flex items-center space-x-3"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {artists &&
                artists.map((item: any) => (
                  <div
                    key={uuidv4()}
                    className="bg-[#202023] border border-slate-600 rounded-lg py-2 px-4 flex flex items-center justify-center space-x-2"
                  >
                    <span className="text-white">{item.name}</span>
                    <span
                      className="cursor-pointer"
                      onClick={() => {
                        setCurrentArtists((prevItems: any) => {
                          if (prevItems.length < 5) {
                            if (
                              !prevItems.find(
                                (current: any) => current.id === item.id
                              )
                            ) {
                              return [...prevItems, item];
                            } else {
                              return [...prevItems];
                            }
                          } else {
                            return [...prevItems];
                          }
                        });
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="#1DB954"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                ))}
            </div>
          </div>
          <button onClick={() => updateIndex(activeIndex + 1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="#202023"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
