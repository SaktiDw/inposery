import useToggle from "@/helper/hooks/useToggle";
import React from "react";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  close: () => void;
};

const Modal = (props: Props) => {
  return (
    // ini modal container
    <div
      className={`fixed z-50 top-0 left-0 w-full h-screen overflow-y-auto ${
        props.isOpen ? "flex" : "hidden"
      } flex-col items-center justify-center`}
    >
      {/* ini backdrop */}
      <div
        className={`fixed top-0 left-0 z-50 w-full h-screen ${
          props.isOpen ? "flex" : "hidden"
        } items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm`}
        onClick={props.close}
      ></div>
      {/* ini modal */}
      <div
        className={`absolute z-50  ${
          props.isOpen ? "flex" : "hidden"
        } flex-col overflow-hidden rounded-2xl bg-white dark:bg-slate-900 dark:bg-opacity-80 backdrop-blur-lg my-8 p-4
         w-10/12 sm:w-[512px] min-h-[328px] max-w-[512px]`}
        //  sm:w-2/3 sm:h-1/2 md:w-1/3 md:h-1/2
      >
        <button
          className="absolute top-0 right-0 m-4 cursor-pointer"
          onClick={props.close}
        >
          <i className="fi-rr-cross"></i>
        </button>
        <div className="overflow-scroll p-4 mt-8">{props.children}</div>
      </div>
    </div>
  );
};

export default Modal;
