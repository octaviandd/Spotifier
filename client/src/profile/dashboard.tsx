/** @format */

import React, { ReactElement, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { fetchTokens } from "../utils/useFetch";
import { getMe } from "../utils/utils";
import TopBar from "./top-bar";
import { useNavigate, useSearchParams, Navigate } from "react-router-dom";

interface Props {
  accessToken: string;
  setAccessToken: any;
}

export default function Dashboard({
  accessToken,
  setAccessToken,
}: Props): ReactElement {
  const [searchParams, setSearchParams] = useSearchParams();
  let code = searchParams.get("code");
  const [loading, setLoading] = useState(false);
  const [refreshToken, setRefreshToken] = useState("");
  const [expireTime, setExpireTime] = useState("");
  const [state, setState] = useState({
    profile: false,
    songs: true,
    playlists: false,
    artists: false,
    player: false,
  });

  const getToken = async () => {
    try {
      setLoading(true);
      await fetch("http://localhost:3000/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed");
          }
        })
        .then((responseJson) => {
          let data = JSON.parse(responseJson.response);
          setAccessToken(data.access_token);
          setExpireTime(data.expires_in);
          setRefreshToken(data.refresh_token);
          history.replaceState(null, "", "/dashboard");
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const getNewAccessToken = async (refreshToken: string) => {
    try {
      setLoading(true);
      await fetch("http://localhost:3000/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed");
          }
        })
        .then((responseJson) => {
          let data = JSON.parse(responseJson.response);
          setAccessToken(data.access_token);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    console.log(accessToken);
    if (Cookies.get("refresh_token")) {
      if (!accessToken) {
        getNewAccessToken(Cookies.get("refresh_token"));
      }
    }
    return () => {
      mounted = false;
    };
  }, []);

  return accessToken ? (
    // <TopBar parentState={state} setParentState={setState} />
    <div>token on</div>
  ) : (
    <Navigate to="/" />
  );
}
