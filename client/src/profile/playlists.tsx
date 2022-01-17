/** @format */

import React, { ReactElement } from "react";
import { useSearchParams } from "react-router-dom";

interface Props {}

export default function PlaylistStats({}: Props): ReactElement {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("code"));

  return <div>playlistss</div>;
}
