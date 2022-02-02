/** @format */

import React, { ReactElement, useEffect, useContext, useState } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { fetchAccessToken } from "../utils/useFetch";
import HomepageNavbar from "./HomepageNavbar";
import { useToken } from "../utils/Context";
import { token } from "../utils/SpotifyAPI";
interface Props {
  setAccessToken: any;
}

export default function Default({}: Props): ReactElement {
  // let refreshToken = Cookies.get("refresh_token");
  // let data = fetchAccessToken({ refreshToken });
  // const { dispatch } = useToken();

  // const [accessToken, setAccessToken] = useState("");

  // useEffect(() => {
  //   setAccessToken(token);
  // }, []);

  return <div>in</div>;
}
