/** @format */

import React, { ReactElement, useEffect, useState } from "react";
import axios from "axios";

interface Props {
  code: string;
  code_verifier: string;
}

export default function useAuth({ code, code_verifier }: Props) {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [expireTime, setExpireTime] = useState("");

  const getToken = async () => {
    let res = await axios.post("http://localhost:3000/login", {
      data: {
        code,
        code_verifier,
      },
    });
    let data = JSON.parse(res.data.response);
    console.log(data);
    setAccessToken(data.access_token);
    setExpireTime(data.expires_in);
    setRefreshToken(data.refresh_token);
    window.history.pushState({}, null, "/");
  };

  useEffect(() => {
    getToken();
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
