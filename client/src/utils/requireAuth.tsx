/** @format */

import React, { ReactElement } from "react";
import { Navigate } from "react-router";
import useAuth from "./useAuth";

interface Props {
  children: any;
}

const code = new URLSearchParams(window.location.search).get("code");

export default function RequireAuth({ children }: Props): ReactElement {
  const accessToken = useAuth({ code });
  return accessToken ? children : <Navigate to="/" replace />;
}
