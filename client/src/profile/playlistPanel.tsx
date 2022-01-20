/** @format */

import React, { ReactElement, useState } from "react";

interface Props {
  accessToken: string;
}

export default function PlaylistStats({ accessToken }: Props): ReactElement {
  const [activeIndex, setActiveIndex] = useState(0);
  let pictures: any[] = [
    "https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg",
    "https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg",
    "https://mdbootstrap.com/img/Photos/Slides/img%20(21).jpg",
  ];

  const updateIndex = (newIndex: number) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= pictures.length) {
      newIndex = pictures.length - 1;
    }
    setActiveIndex(newIndex);
  };
  console.log("test");
  return (
    <div className="">
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
        <div className="w-1/3 h-32 overflow-hidden whitespace-nowrap">
          <div
            className="h-32"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {pictures.map((item) => (
              <div className="inline-flex items-center justify-center">
                <img className="w-full h-32" src={item} />
              </div>
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
