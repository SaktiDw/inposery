import { Cart } from "@/helper/type/Cashier";
import React from "react";

type Props = {
  onClick: () => void;
  cart: Cart[];
};

const CartButton = (props: Props) => {
  const cartItem = props.cart.reduce(
    (sum: number, item: Cart) => sum + item.orderQty,
    0
  );
  return (
    <button
      className="ml-auto rounded-full flex items-center justify-center lg:invisible"
      onClick={props.onClick}
    >
      <i className="fi-rr-shopping-cart relative">
        <div
          className={` z-50
          absolute -top-2 -right-4 min-w-min w-6 whitespace-nowrap bg-green-700 text-xs text-white font-bold flex items-center justify-center overflow-hidden rounded-full`}
        >
          {cartItem}
        </div>
        <div
          className={`z-40 ${cartItem !== 0 && "animate-ping"}
          absolute -top-2 -right-4 min-w-min w-6 whitespace-nowrap bg-green-700 text-xs text-transparent font-bold flex items-center justify-center overflow-hidden rounded-full`}
        >
          {cartItem}
        </div>
      </i>
    </button>
  );
};

export default CartButton;
