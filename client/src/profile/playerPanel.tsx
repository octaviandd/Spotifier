/** @format */

import React, { ReactElement, useMemo, useState } from "react";
import WebPlayback from "../utils/webPlayback";

interface Props {
  accessToken: string;
}

export default function Player({ accessToken }: Props): ReactElement {
  return (
    <div>
      <WebPlayback accessToken={accessToken}></WebPlayback>
    </div>
  );
}
