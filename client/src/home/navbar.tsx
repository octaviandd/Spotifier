/** @format */

import React, { ReactElement, useEffect, useState } from "react";
import { URL } from "../utils/utils";

interface Props {}

export default function Navbar({}: Props): ReactElement {
  return (
    <nav className="bg-white fixed drop-shadow-lg w-full z-10">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-col items-center"></div>
            <div className="flex justify-between gap-1 w-12 h-10 ml-4">
              <div className="bg-green-400 rounded-md scale-y-50 h-100 w-4 animate-bounce-quiet"></div>
              <div className="bg-green-400 rounded-md scale-y-50 h-100 w-4 animate-bounce-slow"></div>
              <div className="bg-green-400 rounded-md scale-y-50 h-100 w-4 animate-bounce-quiet"></div>
              <div className="bg-green-400 rounded-md scale-y-50 h-100 w-4 animate-bounce-loud"></div>
              <div className="bg-green-400 rounded-md scale-y-50 h-100 w-4 animate-bounce-quiet"></div>
            </div>
          </div>
          <div className="flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="ml-3 relative">
              <div className="">
                <a href={URL} className="inline-block mr-2">
                  <button
                    type="button"
                    className="transition duration-200 bg-green-500 hover:bg-green-600 focus:bg-green-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 pr-3 pl-3 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                  >
                    {" "}
                    <span className="hidden md:inline-block pr-1">
                      Connect with{" "}
                    </span>
                    <span>Spotify</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4 inline-block"
                    >
                      <path
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
