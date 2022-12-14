import React from "react";

type Props = {
  children: React.ReactNode;
};

const ErrorLayout = (props: Props) => {
  return (
    <div className="w-full min-h-screen flex flex-col gap-4 items-center justify-center dark:bg-slate-800">
      {props.children}
    </div>
  );
};

export default ErrorLayout;
