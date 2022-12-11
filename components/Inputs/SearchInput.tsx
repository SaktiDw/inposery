import React from "react";

type Props = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const SearchInput = (props: Props) => {
  return (
    <div className="flex items-center py-2 px-4 shadow-lg bg-white dark:bg-slate-800 rounded-lg overflow-hidden">
      <input
        type="text"
        name="search"
        placeholder="Search here ..."
        className="outline-none bg-transparent"
        onChange={props.onChange}
      />
      <i className="fi-rr-search"></i>
    </div>
  );
};

export default SearchInput;
