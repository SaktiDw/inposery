import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  type: "register" | "login";
};

const GoogleButton = (props: Props) => {
  return (
    <Link
      className="py-2 px-4 flex gap-2 items-center justify-center rounded-lg shadow-lg bg-slate-50 hover:bg-white dark:bg-slate-800 dark:hover:bg-slate-700"
      href={`${process.env.API_URL}/api/auth/google`}
    >
      <span className="capitalize">{props.type} with google</span>
      <Image alt="google icon" src={"/google.png"} width={20} height={20} />
    </Link>
  );
};

export default GoogleButton;
