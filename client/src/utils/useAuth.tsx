/** @format */

import React, { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

interface Props {
  code: string;
}

export default function useAuth({ code }: Props) {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [expireTime, setExpireTime] = useState("");
  const navigate = useNavigate();

  const getToken = async () => {
    let res = await axios.post("http://localhost:3000/login", {
      data: {
        code,
      },
    });
    let data = JSON.parse(res.data.response);
    console.log({ data: data.access_token });
    setAccessToken(data.access_token);
    setExpireTime(data.expires_in);
    setRefreshToken(data.refresh_token);
  };

  useEffect(() => {
    if (!Cookies.get("token")) {
      getToken();
      console.log("test");
    } else {
      navigate("/");
    }
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expireTime) return;
    const interval = setInterval(() => {
      axios
        .post("http://localhost:3000/refresh", {
          refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpireTime(res.data.expiresIn);
        })
        .catch(() => {
          window.location.href = "/";
        });
    }, (Number(expireTime) - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expireTime]);

  return accessToken;
}
