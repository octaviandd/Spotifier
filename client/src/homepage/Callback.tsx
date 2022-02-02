/** @format */

import React, { ReactElement, useEffect } from "react";
import Dashboard from "../components/dashboard/Dashboard";
import { fetchTokens } from "../utils/useFetch";
import Spinner from "../utils//Spinner";
import { useToken } from "../utils/Context";

interface Props {}

export default function Callback({}: Props): ReactElement {
  return <div>callback</div>;
  // let data: any = fetchTokens();
  // const { dispatch } = useToken();
  // if (data) {
  //   useToken();
  //   // setAccessToken(data.access_token);
  //   // history.replaceState(null, "", "/dashboard");
  //   dispatch({ state: data.access_token, type: "set" });
  // }

  // console.log(data.access_token);

  // return !data.loading ? (
  //   <Dashboard accessToken={data.access_token}></Dashboard>
  // ) : (
  //   <Spinner />
  // );
}
