import { useAuth } from "@/helper/context/AuthContext";
import axiosInstance from "@/helper/lib/client";
import { destroyToken } from "@/helper/lib/token";
import Link from "next/link";
import React, { useEffect } from "react";
import useSWR from "swr";

type Props = {
  onClick: () => void;
  data?: any;
};

const Navigation = (props: Props) => {
  // const { data, mutate } = useSWR("/api/me", (url) =>
  //   axiosInstance.get(url).then((res) => res.data.data)
  // );

  const { user, logout } = useAuth();
  useEffect(() => {}, [user]);
  return (
    <nav className="fixed top-0 left-0 z-50 w-full px-6 py-3 flex items-center bg-slate-100 bg-opacity-50 backdrop-blur dark:bg-slate-900 dark:backdrop-blur-lg dark:bg-opacity-50">
      <button className="p-3" onClick={props.onClick}>
        <i className="fi-rr-menu-burger"></i>
      </button>
      <span className="font-bold text-2xl">
        In<span className="text-lime-500">POS</span>ery
      </span>
      <div className="flex gap-2 ml-auto">
        <>
          {user && user.email ? (
            <span className="cursor-pointer" onClick={() => logout()}>
              {user.email}
            </span>
          ) : (
            <>
              <Link href={"/login"}>Login</Link>
              <Link href={""}>Register</Link>
            </>
          )}
        </>
      </div>
    </nav>
  );
};

export default Navigation;

// export const getSeverSideProps = async (ctx: any) => {
//   const res = await axiosInstance.get("/api/me", {
//     headers: {
//       Authorization: `Bearer ${ctx.req.headers.cookie}`,
//     },
//   });
//   const data = await res.data.data;
//   return {
//     props: {
//       data,
//     },
//   };
// };
