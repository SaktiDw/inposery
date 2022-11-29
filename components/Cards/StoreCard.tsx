import useToggle from "@/helper/hooks/useToggle";
import axios from "@/helper/lib/api";
import Image from "next/image";
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
      <button
        className="absolute cursor-pointer flex justify-end right-2 top-2 z-10"
        tabIndex={0}
        onFocus={() => toggler()}
        onBlur={() => setToggle(toggle ? !toggle : toggle)}
      >
        <i className="fi-rr-menu-dots-vertical"></i>
        <div
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
      </button>
      <div className="relative bg-gradient-to-tl from-green-700 to-lime-500  p-2 leading-tight w-full h-[150px] overflow-hidden">
        {props.data.media[0] && (
          <Image
            fill
            src={props.data.media[0]?.original_url}
            alt={props.data.media[0]?.file_name}
            className="object-cover w-full h-full"
          />
        )}
      </div>
      <div className="p-2 flex gap-4 items-center">
        <Link href={`/store/${props.data.id}`} className="text-xl font-bold">
          {props.data.name}
        </Link>
        <Link href={"#"} className="ml-auto">
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