/** @format */

import React, { ReactElement } from "react";

interface Props {
  parentState: any;
  setParentState: any;
  accessToken: string;
}

export default function CurrentDisplay({
  parentState,
  setParentState,
  accessToken,
}: Props): ReactElement {
  return <div></div>;
}
