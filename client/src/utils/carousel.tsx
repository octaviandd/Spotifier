/** @format */

import React, { ReactElement, useState } from "react";
import SpotifyLogo from "../assets/spotify.png";
import { v4 as uuidv4 } from "uuid";
import { Modal } from "./modal";

interface Props {
  items: any;
  setModal: any;
}

const CarouselItem = ({ items, setModal }: Props) => {
  const [tooltip, setTooltip] = useState(false);
  const [expander, setExpander] = useState(false);
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
                items.images[0]
                  ? items.images[0].url
                  : items.images[1]
                  ? items.images[1].url
                  : items.images[2]
                  ? items.images[2].url
                  : SpotifyLogo
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
        <div className="border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
          <div className="flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            <h5 className="text-xl font-medium leading-normal text-gray-800">
              {items.name}
            </h5>
            <button
              type="button"
              className="box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
            ></button>
          </div>
          <div className="relative p-4 flex flex-col">
            <img
              className="w-36 h-36"
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
            <p>Followers: {items.followers.total}</p>
            <p>Popularity: {items.popularity}</p>
          </div>
          <div className="flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
            <button
              onClick={() => setIsOpen(false)}
              type="button"
              className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default function Carousel({ items, setModal }: Props): ReactElement {
  const [activeIndex, setActiveIndex] = useState(0);

  const updateIndex = (newIndex: number) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= items.length / 4) {
      newIndex = items.length / 4 - 1;
    }
    setActiveIndex(newIndex);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-center">
        <button onClick={() => updateIndex(activeIndex - 1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="lg:w-80 md:w-60 h-20 overflow-hidden whitespace-nowrap">
          <div
            className="h-20 transition-all ease-in-out duration-300"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {items &&
              items.map((item: any) => (
                <CarouselItem setModal={setModal} items={item} key={uuidv4()} />
              ))}
          </div>
        </div>
        <button onClick={() => updateIndex(activeIndex + 1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
