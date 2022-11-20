import axiosInstance from "@/helper/lib/client";
import React, { forwardRef, useEffect, useState } from "react";
import useSWR from "swr";
import PriceFormater from "../FormatText/PriceFormater";

export const Receipts = forwardRef((props: any, ref: any) => {
  if (!props.data) return <>Loading</>;
  return (
    <div ref={ref} className="flex flex-col rounded-lg p-4 w-[300px] text-sm">
      {/* <header className="text-xl font-bold">Toko Inposery</header>
      <table className="table table-auto border ">
        <thead>
          <tr>
            <td>No</td>
            <td>Name</td>
            <td>Qty</td>
            <td>Harga</td>
          </tr>
        </thead>
        <tbody>
          {props.data &&
            JSON.parse(props.data.product).map((item: any, index: number) => {
              return (
                <tr className="border">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.qty}</td>
                  <td className="p-2">
                    <PriceFormater price={item.price} />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <footer>
        <div className="flex item-center justify-between">
          <span>subTotal</span>
          <PriceFormater price={props.data.total} />
        </div>
        <div className="flex item-center justify-between">
          <span>payment</span>
          <PriceFormater price={props.data.payment} />
        </div>
        <div className="flex item-center justify-between">
          <span>change</span>
          <PriceFormater price={props.data.change} />
        </div>
      </footer> */}
      <div className="rounded-lg shadow-lg p-12 text-xs mt-8 mx-4 sm:mx-0 bg-white">
        <div>
          <div className="flex flex-col">
            <h1 className="text-gray-800 text-xl font-medium mb-2">Receipt</h1>
            <p className="text-gray-600 text-xs">
              Date: {props.data.createdAt}
            </p>
            <p className="text-gray-600 text-xs">
              Order Number: {props.data.id}
            </p>
          </div>
          <hr className="my-4" />
          <div>
            {props.data &&
              JSON.parse(props.data.product).map((item: any, index: number) => {
                return (
                  <div key={index}>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-base">{item.name}</span>
                      <PriceFormater
                        price={item.sellPrice}
                        className="text-base font-medium"
                      />
                    </div>
                    <div className="mb-4 flex justify-between items-center">
                      <span>*Quantity:</span>
                      <span className="">{item.qty}</span>
                    </div>
                  </div>
                );
              })}

            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Total</span>
              <PriceFormater
                price={parseInt(props.data.total)}
                className="text-lg font-medium"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

Receipts.displayName = "Receipts";
export default Receipts;
