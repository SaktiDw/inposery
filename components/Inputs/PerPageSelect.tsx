import React from "react";

type Props = {
  onChange: (e: any) => void;
};

const PerPageSelect = (props: Props) => {
  return (
    <>
      <div className="relative flex items-center rounded-lg overflow-hidden shadow-lg bg-white dark:bg-slate-800 text-slate-500">
        <span className="absolute left-0 p-2 z-10 pointer-events-none">
          Per Page
        </span>
        <select
          name="perPage"
          id="perPage"
          className=" py-2 pl-4 pr-8 appearance-none relative bg-white dark:bg-slate-800 w-36 text-right"
          onChange={props.onChange}
          defaultValue="10"
        >
          <option value="2">2</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <i className="fi-rr-angle-small-down absolute right-0  p-2 pointer-events-none"></i>
      </div>
    </>
  );
};

export default PerPageSelect;
