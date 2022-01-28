/** @format */

import React, { ReactElement, useEffect } from "react";
import Dashboard from "../components/dashboard/Dashboard";
import { fetchTokens } from "../utils/useFetch";

interface Props {
  accessToken: string;
  setAccessToken: any;
}

export default function Callback({
  accessToken,
  setAccessToken,
}: Props): ReactElement {
  let data = fetchTokens();

  useEffect(() => {
    if (data) {
      setAccessToken(data.access_token);
    }
    history.replaceState(null, "", "/dashboard");
  }, [data]);

  return accessToken ? (
    <Dashboard
      accessToken={accessToken}
      setAccessToken={setAccessToken}
    ></Dashboard>
  ) : (
    <div>wait</div>
  );
}
