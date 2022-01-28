/** @format */

import React, { ReactElement, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CarouselItem } from "./CarouselItem";

interface Props {
  items: any;
}

export default function Carousel({ items }: Props): ReactElement {
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
        <div className="lg:w-60 md:w-40 h-20 overflow-hidden whitespace-nowrap">
          <div
            className="h-20 transition-all ease-in-out duration-300"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {items &&
              items.map((item: any) => (
                <CarouselItem items={item} key={uuidv4()} />
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
