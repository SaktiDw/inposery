import Link from "next/link";
import React from "react";

type Props = {
  href: string;
  active: boolean;
  icon: string;
  text: string;
};

const SidebarItem = (props: Props) => {
  return (
    <Link
      href={props.href}
      className={`p-2 rounded-lg flex outline-none
        ${
          props.active &&
          "bg-white shadow-lg dark:bg-slate-800 dark:text-slate-100"
        } group hover:bg-white hover:text-slate-800 hover:shadow-lg hover:scale-105 transition-all ease-in-out duration-200
        dark:hover:bg-slate-800 dark:hover:text-slate-100`}
    >
      <>
        <i
          className={`w-10 h-10 rounded-lg flex justify-center items-center transition-all ease-in-out duration-200 shadow group-hover:text-white group-hover:bg-gradient-to-tl from-green-700 to-lime-500  ${
            props.active
              ? "bg-gradient-to-tl from-green-700 to-lime-500 text-white"
              : "bg-white shadow-xl text-slate-800 dark:bg-slate-800 dark:text-slate-100"
          } ${props.icon}`}
        ></i>
        <span className="p-2">{props.text}</span>
      </>
    </Link>
  );
};

export default SidebarItem;
