import React from "react";

type Props = {
  meta: {
    total: number;
    page: number;
    perPage: number;
    pageCount: number;
  };
  setPage: React.Dispatch<React.SetStateAction<number>>;
  // prev: () => void;
  // next: () => void;
};

const Pagination = (props: Props) => {
  return (
    <>
      <div className="flex gap-2">
        <button
          className="w-10 h-10 bg-white dark:bg-slate-800 dark:text-white shadow-md rounded-xl  hover:scale-110 transition-all ease-in-out duration-200 hover:shadow-xl"
          onClick={() =>
            props.meta.page > 1 && props.setPage(props.meta.page - 1)
          }
        >
          <i className="fi-rr-angle-small-left" />
        </button>
        {/* {Array(props.meta.pageCount)
          .fill(true) */}
        {Array.from({ length: props.meta.pageCount }, (_, i) => i + 1).map(
          (item) => (
            <button
              key={item}
              className={`w-10 h-10 text-xs dark:text-white shadow-md rounded-xl hover:scale-110 transition-all ease-in-out duration-200 hover:shadow-xl ${
                props.meta.page === item
                  ? `bg-gradient-to-tl from-green-700 to-lime-500 text-white`
                  : `bg-white dark:bg-slate-800`
              }`}
              onClick={() => props.setPage(item)}
            >
              {item}
            </button>
          )
        )}
        <button
          className="w-10 h-10 bg-white dark:bg-slate-800 dark:text-white shadow-md rounded-xl hover:scale-110 transition-all ease-in-out duration-200 hover:shadow-xl"
          onClick={() =>
            props.meta.page < props.meta.pageCount &&
            props.setPage(props.meta.page + 1)
          }
        >
          <i className="fi-rr-angle-small-right" />
        </button>
      </div>
    </>
  );
};

export default Pagination;
