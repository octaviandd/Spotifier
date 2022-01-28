/** @format */
import React, { useRef, useEffect, useState } from "react";
import Portal from "./Portal";

export const Modal = (props: any) => {
  const [active, setActive] = useState(false);
  const { open, onClose, locked } = props;
  const backdrop = useRef(null);

  useEffect(() => {
    const { current } = backdrop;
    const transitionEnd = () => setActive(open);
    const keyHandler = (e: any) =>
      !locked && [27].indexOf(e.which) >= 0 && onClose();

    const clickHandler = (e: any) => {
      e.target === current && onClose();
    };

    if (current) {
      current.addEventListener("transitioned", transitionEnd);
      current.addEventListener("click", clickHandler);
      window.addEventListener("keyup", keyHandler);
    }
    if (open) {
      window.setTimeout(() => {
        (document.activeElement as HTMLElement).blur();
        setActive(open);
        document.querySelector("#root").setAttribute("inert", "true");
      }, 10);
    }

    return () => {
      if (current) {
        current.removeEventListener("transitionend", transitionEnd);
        current.removeEventListener("click", clickHandler);
      }
      window.removeEventListener("keyup", keyHandler);
      document.querySelector("#root").removeAttribute("inert");
    };
  }, [open, locked, onClose]);

  return (
    <>
      {open && (
        <Portal>
          <div
            ref={backdrop}
            className={
              open
                ? "fixed inset-0  transition-all flex justify-center items-center backdrop-blur-sm"
                : " fixed inset-0 transition-all flex justify-center items-center backdrop-blur-sm"
            }
            style={{ backgroundColor: "rgba(51, 51, 51, 0.3)" }}
          >
            <div className="relative bg-white opacity-1">
              <div className="relative w-auto pointer-events-none">
                {props.children}
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};
