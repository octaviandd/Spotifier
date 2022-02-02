/** @format */

import React, { ReactElement, useEffect, useState } from "react";
import Dashboard from "../components/dashboard/Dashboard";
import { token } from "../utils/SpotifyAPI";
import HomepageNavbar from "./HomepageNavbar";
interface Props {}

export default function App({}: Props): ReactElement {
  const [accessToken, setAccessToken] = useState();

  useEffect(() => {
    setAccessToken(token);
  }, []);

  return accessToken ? <Dashboard /> : <HomepageNavbar />;
}
