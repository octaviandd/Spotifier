/** @format */

import React, { useMemo, useEffect } from "react";
import ReactDOM from "react-dom";

type Props = {
  children: any;
  parent: any;
  className: any;
};

export default function Portal(props: any) {
  let { parent, className, children } = props;
  const el = useMemo(() => document.createElement("div"), []);
  useEffect(() => {
    const target = document.body;
    const classList = ["portal-container"];
    if (className)
      className.split(" ").forEach((item: any) => classList.push(item));
    classList.forEach((item) => el.classList.add(item));
    target.appendChild(el);
    return () => {
      target.removeChild(el);
    };
  }, [el, parent, className]);

  return ReactDOM.createPortal(children, el);
}
