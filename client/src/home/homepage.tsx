/** @format */

import React, { ReactElement, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../profile/dashboard";
import Default from "./default";
import Callback from "./callback";
interface Props {}

export default function Homepage({}: Props): ReactElement {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Default
            accessToken={accessToken}
            setAccessToken={setAccessToken}
          ></Default>
        }
      ></Route>
      <Route
        path="/callback"
        element={
          <Callback
            accessToken={accessToken}
            setAccessToken={setAccessToken}
          ></Callback>
        }
      />
      <Route
        path="/dashboard"
        element={
          <Dashboard
            accessToken={accessToken}
            setAccessToken={setAccessToken}
          ></Dashboard>
        }
      />
    </Routes>
  );
}
