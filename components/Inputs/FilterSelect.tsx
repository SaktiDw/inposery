import React from "react";

type Props = {
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
};

const PerPageSelect = (props: Props) => {
  return (
    <>
      <div className="relative flex items-center rounded-lg overflow-hidden shadow-lg bg-white dark:bg-slate-800 text-slate-500">
        <span className="absolute left-0 p-2 z-10 pointer-events-none">
          Show
        </span>
        <select
          name="perPage"
          id="perPage"
          className=" py-2 pl-4 pr-8 appearance-none relative bg-white dark:bg-slate-800 w-36 text-right"
          onChange={props.onChange}
          defaultValue=""
        >
          <option value="default">Default</option>
          <option value="with">All</option>
          <option value="only">Tash</option>
        </select>
        <i className="fi-rr-angle-small-down absolute right-0  p-2 pointer-events-none"></i>
      </div>
    </>
  );
};

export default PerPageSelect;
