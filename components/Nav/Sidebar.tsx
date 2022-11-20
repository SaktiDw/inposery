import React from "react";

type Props = {
  isOpen: boolean;
  children?: React.ReactNode;
};

const Sidebar = (props: Props) => {
  return (
    <aside
      className={`h-screen min-h-screen max-h-screen md:relative pt-16 pb-4 flex flex-col gap-10 overflow-y-auto overflow-x-hidden transition-all ease-in-out duration-200
fixed left-0 bottom-0 top-0 z-20 bg-slate-100 bg-opacity-50 backdrop-blur md:bg-opacity-0
dark:bg-slate-900 dark:backdrop-blur-lg dark:bg-opacity-50
${props.isOpen ? "w-0 p-0" : "w-[300px]"}`}
    >
      <div className=" overflow-y-auto scroll-smooth flex flex-col gap-4 p-4 pb-8 text-slate-500">
        {props.children}
      </div>
      <div className="p-4 mx-4 rounded-md shadow-lg bg-gradient-to-tl from-green-700 to-lime-500 mt-auto flex gap-2">
        Pro
      </div>
    </aside>
  );
};

export default Sidebar;
