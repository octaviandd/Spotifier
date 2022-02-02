/** @format */

import React from "react";

type Props = {};

export default function Spinner({}: Props) {
  return (
    <div className="w-[40px] h-screen relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-[50px] auto">
      <div className="w-[40px] h-[40px] rounded-full bg-[#fff] opacity-[0.6] absolute top-0 left-0 animate-ping delay-100"></div>
      <div className="w-[40px] h-[40px] rounded-full bg-[#333] opacity-[0.6] absolute top-0 left-0 animate-ping"></div>
    </div>
  );
}
