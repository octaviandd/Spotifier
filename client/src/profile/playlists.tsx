/** @format */

import React, { ReactElement } from "react";
import { useSearchParams } from "react-router-dom";

interface Props {}

export default function PlaylistStats({}: Props): ReactElement {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log("test");
  console.log(searchParams);

  return <div>playlistss</div>;
}
