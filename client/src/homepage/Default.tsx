/** @format */

import React, { ReactElement, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { fetchAccessToken } from "../utils/useFetch";
import HomepageNavbar from "./HomepageNavbar";

interface Props {
  accessToken: string;
  setAccessToken: any;
}

export default function Default({
  accessToken,
  setAccessToken,
}: Props): ReactElement {
  const [refreshToken, setRefreshToken] = useState(
    Cookies.get("refresh_token") || null
  );
  let data = fetchAccessToken({ refreshToken });

  useEffect(() => {
    if (data) {
      setAccessToken(data.access_token);
    }
  }, [data]);

  return accessToken ? <Navigate to="/dashboard" /> : <HomepageNavbar />;
}
