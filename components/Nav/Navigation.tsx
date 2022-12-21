import useAuth from "@/helper/hooks/useAuth";
import axios from "@/helper/lib/axios";
import Link from "next/link";
import React, { useEffect } from "react";
import useSWR from "swr";

type Props = {
  onClick: () => void;
};

const Navigation = (props: Props) => {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 z-50 w-full px-6 py-3 flex items-center justify-between bg-slate-100 bg-opacity-50 backdrop-blur dark:bg-slate-900 dark:backdrop-blur-lg dark:bg-opacity-50">
      <div>
        <button className="p-3" onClick={props.onClick}>
          <i className="fi-rr-menu-burger"></i>
        </button>
        <Link
          href={"/dashboard"}
          className="font-bold text-2xl invisible sm:visible"
        >
          In<span className="text-lime-500">POS</span>ery
        </Link>
      </div>
      {/* <span className="text-lime-500 font-bold text-2xl">Store Name</span> */}
      <div className="flex gap-2 ">
        {user ? (
          <span className="cursor-pointer" onClick={() => logout()}>
            {user.email}
          </span>
        ) : (
          <>
            <Link href={"/login"}>Login</Link>
            <Link href={"/register"}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
