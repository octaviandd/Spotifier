/** @format */

import React, { useContext, useReducer } from "react";
interface AppContextInterface {
  state: any;
  dispatch: any;
}
type Props = {};

function tokenSetter(state: any, action: any) {
  switch (action.type) {
    case "set": {
      return { token: state.token };
    }
    case "remove": {
      return { token: "" };
    }
    default: {
      throw new Error(`Unhandled action type : ${action.type}`);
    }
  }
}

export const AppCtx = React.createContext<AppContextInterface | null>(null);

export const TokenProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(tokenSetter, { token: "" });
  const value = { state, dispatch };
  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
};

export const useToken = () => {
  const context = useContext(AppCtx);
  if (context === undefined) {
    throw new Error("Must be within a Token Provider");
  }
  return context;
};
