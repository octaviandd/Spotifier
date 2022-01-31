/** @format */

import React, { ReactElement, useEffect } from "react";
import Dashboard from "../components/dashboard/Dashboard";
import { fetchTokens } from "../utils/useFetch";
import Spinner from "../utils//Spinner";

interface Props {
  accessToken: string;
  setAccessToken: any;
}

export default function Callback({
  accessToken,
  setAccessToken,
}: Props): ReactElement {
  let data = fetchTokens();

  if (data) {
    setAccessToken(data.access_token);
    history.replaceState(null, "", "/dashboard");
  }

  return accessToken ? (
    <Dashboard accessToken={accessToken}></Dashboard>
  ) : (
    <Spinner />
  );
}
