/** @format */
import React, { useState } from "react";
import { Modal } from "./Modal";
import SpotifyLogo from "../../images/spotify.png";

interface Props {
  items: any;
}

export const CarouselItem = ({ items }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={(e) => {
          setIsOpen(true);
        }}
        className="relative inline-flex items-center justify-center cursor-pointer"
      >
        <a className="relative w-20 h-20">
          <div
            className="relative w-20 h-20 bg-cover before:bg-background-opacity before:content-[''] before:top-0 before:bottom-0 before:left-0 before:right-0 before:absolute "
            style={{
              backgroundImage: `url(${
                items.images[2] ? items.images[2].url : SpotifyLogo
              })`,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-100 fill-slate-300"
              viewBox="0 0 20 20"
              fill="#fffff"
            >
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 110-2h4a1 1 0 011 1v4a1 1 0 11-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 112 0v1.586l2.293-2.293a1 1 0 011.414 1.414L6.414 15H8a1 1 0 110 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 110-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L15 13.586V12a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </a>
      </div>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="max-w-xs bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 pointer-events-auto">
          <a className="rounded-lg">
            <img
              className="object-cover rounded-t-lg m-w-xs h-auto"
              src={
                items.images[0]
                  ? items.images[0].url
                  : items.images[1]
                  ? items.images[1].url
                  : items.images[2]
                  ? items.images[2].url
                  : SpotifyLogo
              }
            />
          </a>
          <div className="p-5 rounded-lg">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {items.name}
            </h5>
            <div className="relative p-4 flex flex-col">
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Followers: {items.followers.total}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Popularity: {items.popularity}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={items.external_urls.spotify}
                className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-violet-700 rounded-lg hover:bg-violet-800 focus:ring-4 focus:ring-violet-300 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"
              >
                Check Spotify Profile
                <svg
                  className="ml-2 -mr-1 w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <button
                onClick={() => setIsOpen(false)}
                type="button"
                className="cursor-pointer inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-violet-700 rounded-lg hover:bg-violet-800 focus:ring-4 focus:ring-violet-300 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 20 20"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
