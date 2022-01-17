/** @format */

import Cookies from "js-cookie";
import React, { ReactElement, useEffect, useState } from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  useSearchParams,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Dashboard from "../profile/dashboard";
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
