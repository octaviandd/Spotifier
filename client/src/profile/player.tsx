/** @format */

import React, { ReactElement } from "react";

interface Props {
  width: number;
}

export default function Player({ width }: Props): ReactElement {
  return <div style={{ width: width }}>playerrrr</div>;
}
