/** @format */

import React, { ReactElement, useEffect, useState } from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  useSearchParams,
} from "react-router-dom";
import RequireAuth from "../utils//requireAuth";
import Dashboard from "../profile/dashboard";
import Default from "./default";
import PlaylistStats from "../profile/playlists";
interface Props {}

export default function Homepage({}: Props): ReactElement {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("code"));
  return (
    <Routes>
      <Route path="/" element={<Default></Default>}></Route>
      <Route path="/callback:id" element={<PlaylistStats />} />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Dashboard></Dashboard>
          </RequireAuth>
        }
      ></Route>
    </Routes>
  );
}
