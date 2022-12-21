import React from "react";
import { useRouter } from "next/router";

type Props = {
  code: number;
  message: string;
  children?: React.ReactNode;
};

const ErrorLayout = (props: Props) => {
  const router = useRouter();
  return (
    <div className="w-full min-h-screen flex flex-col gap-4 items-center justify-center dark:bg-slate-900">
      <div className="flex flex-col items-center">
        <h1 className="text-9xl text-slate-800 dark:text-white">
          {props.code}
        </h1>
        <p className="text-2xl text-slate-500">{props.message}</p>
      </div>
      <button
        onClick={() => router.back()}
        className="shadow-lg p-2 rounded-lg px-8 bg-slate-800 text-white dark:bg-white dark:text-slate-800"
      >
        Back
      </button>
      {props.children}
    </div>
  );
};

export default ErrorLayout;
