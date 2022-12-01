import React from "react";
import { PriceFormater } from "@/components";
import Image from "next/image";
import { Product } from "@/helper/type/Response";

type Props = {
  data: Product;
  onClick: () => void;
};

const ProductCart = (props: Props) => {
  return (
    <div
      className="relative cursor-pointer rounded-xl shadow-md bg-white dark:bg-slate-800 overflow-hidden hover:scale-105 transition-all ease-in-out duration-200 hover:shadow-xl"
      onClick={props.onClick}
    >
      <div className="relative bg-gradient-to-tl from-green-700 to-lime-500 p-2 leading-tight w-full h-[120px]">
        {props.data?.media[0] && (
          <Image
            fill
            placeholder="blur"
            blurDataURL={props.data?.media[0]?.preview_url}
            src={props.data?.media[0]?.original_url}
            alt={props.data?.media[0]?.file_name}
            className="object-cover w-full h-full"
          />
        )}
      </div>
      <div className="p-2 text-sm">
        <div className="truncate text-slate-500">{props.data?.name}</div>
        <div className="flex item-center justify-between font-semibold">
          <PriceFormater price={props.data?.sell_price || 0} />
          <span>{props.data?.qty.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
