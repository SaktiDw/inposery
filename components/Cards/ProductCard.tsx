import useToggle from "@/helper/hooks/useToggle";
import axiosInstance from "@/helper/lib/client";
import Link from "next/link";
import React from "react";
import { mutate } from "swr";
import { PriceFormater } from "@/components";

type Props = {
  data?: any;
  onClick?: () => void;
};

const StoreCard = (props: Props) => {
  const { toggle, toggler, setToggle } = useToggle();

  return (
    <div
      className="relative cursor-pointer rounded-xl shadow-md dark:bg-slate-800 overflow-hidden hover:scale-105 transition-all ease-in-out duration-200 hover:shadow-xl"
      onClick={props.onClick}
    >
      <div className="bg-gradient-to-tl from-green-700 to-lime-500 p-2 leading-tight w-full h-[120px]"></div>
      <div className="p-2 text-sm">
        <div className="truncate text-slate-500">{props.data.name}</div>
        <div className="flex item-center justify-between font-semibold">
          <PriceFormater price={props.data.sellPrice} />
          <span>{props.data.qty.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
