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
    <div>
      <button onClick={() => updateIndex(activeIndex - 1)}> prev </button>
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
      <button onClick={() => updateIndex(activeIndex + 1)}>next</button>
    </div>
  );
}
