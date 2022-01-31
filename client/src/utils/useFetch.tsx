/** @format */
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

interface RefreshToken {
  refreshToken: string;
}

export function fetchTokens() {
  const [searchParams, setSearchParams] = useSearchParams();
  let code = searchParams.get("code");
  const [state, setState] = useState({ data: null, loading: true });

  useEffect(() => {
    setState((state) => ({
      data: state.data,
      loading: true,
    }));
    const getData = async () => {
      console.log("helloeoeoeoeo");
      try {
        await fetch("http://localhost:3000/login", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error("Failed");
            }
          })
          .then((resJson) => {
            let data = JSON.parse(resJson.response);
            setState({ data: data, loading: false });
          });
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  if (!state.loading) {
    return { loading: state.loading, access_token: state.data.access_token };
  }
}

export function fetchAccessToken({ refreshToken }: RefreshToken) {
  const [state, setState] = useState({ data: null, loading: true });
  useEffect(() => {
    if (refreshToken) {
      setState((state) => ({
        data: state.data,
        loading: true,
      }));
      let getData = async () => {
        try {
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
              setState({ data: data, loading: false });
            });
        } catch (error) {
          console.log(error);
        }
      };
      getData();
    }
  }, []);

  if (!state.loading) {
    return { loading: state.loading, access_token: state.data.access_token };
  }
}
