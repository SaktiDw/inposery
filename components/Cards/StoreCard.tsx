import useToggle from "@/helper/hooks/useToggle";
import axiosInstance from "@/helper/lib/client";
import Link from "next/link";
import React from "react";
import { mutate } from "swr";

type Props = {
  data: any;
  onDelete: () => void;
  onEdit: () => void;
};

const StoreCard = (props: Props) => {
  const { toggle, toggler, setToggle } = useToggle();

  return (
    <div className="relative rounded-xl shadow-md dark:bg-slate-800 overflow-hidden hover:scale-110 transition-all ease-in-out duration-200 hover:shadow-xl">
      <div className="bg-gradient-to-tl from-green-700 to-lime-500 p-2 leading-tight w-full h-[150px]">
        <div className="flex justify-between items-center">
          <Link href={`/store/${props.data.id}`} className="text-xl font-bold">
            {props.data.name}
          </Link>
          <div
            className="relative cursor-pointer"
            onClick={toggler}
            onBlur={() => toggle && setToggle(!toggle)}
          >
            <i className="fi-rr-menu-dots-vertical"></i>
            <div
              tabIndex={0}
              className={`bg-slate-100 dark:bg-slate-800 flex flex-col rounded-lg right-5 m-2 w-32 ${
                toggle ? "h-90" : "h-0"
              } absolute top-0 overflow-hidden `}
            >
              <button
                className="py-2 px-8 hover:bg-slate-500"
                onClick={props.onDelete}
              >
                Delete
              </button>
              <button
                className="py-2 px-8 hover:bg-slate-500"
                onClick={props.onEdit}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
        <span className="text-sm">Employee 26</span>
      </div>
      <div className="py-2 px-4 flex gap-4 justify-end">
        <Link href={"#"}>
          <i className="fi-rr-chat-arrow-grow"></i>
        </Link>
        <Link href={"#"}>
          <i className=" fi-rr-folder"></i>
        </Link>
      </div>
    </div>
  );
};

export default StoreCard;
