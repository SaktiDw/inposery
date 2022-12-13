import axios from "@/helper/lib/axios";
import moment from "moment";
import React, { forwardRef, useEffect, useState } from "react";
// import QRCode from "react-qr-code";
import QRImage from "react-qr-image";
import { WhatsappIcon, WhatsappShareButton } from "react-share";
import PriceFormater from "../FormatText/PriceFormater";

export const Receipt = forwardRef((props: any, ref: any) => {
  function addLeadingZeros(num: number, totalLength: number) {
    return String(num).padStart(totalLength, "0");
  }

  if (!props.data) return <>Loading</>;
  return (
    <>
      <div
        ref={ref}
        className="flex flex-col items-stretch rounded-lg text-sm bg-white text-black shadow-lg "
      >
        <div className="flex flex-col p-4">
          <h1 className="text-gray-800 text-xl font-semibold mb-2">
            {props.data.store.name}
          </h1>
          <p className="text-gray-600 text-xs">
            Date: {moment(props.data.created_at).format("LLLL")}
          </p>
          <p className="text-gray-600 text-xs">
            Order Number: {addLeadingZeros(props.data.id, 10)}
          </p>
        </div>
        <div className="w-full">
          {props.data &&
            JSON.parse(props.data.products).map((item: any, index: number) => {
              return (
                <div key={index} className="px-4 py-2 odd:bg-slate-100">
                  <div className="flex justify-between items-center">
                    <span className="text-md font-semibold">{item.name}</span>
                    <span className="">Qty: {item.orderQty}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <PriceFormater
                      price={item.sell_price}
                      className="text-md font-medium"
                    />
                    <PriceFormater
                      className="text-base"
                      price={item.orderQty * item.sell_price}
                    />
                  </div>
                </div>
              );
            })}

          <div className="flex justify-between items-center p-4">
            <span className="text-lg font-semibold">Total</span>
            <PriceFormater
              price={parseInt(props.data.total)}
              className="text-lg font-semibold"
            />
          </div>
        </div>
        <div className="p-2 flex items-center justify-center">
          <QRImage transparent={true} background="white" color="black" size={5}>
            {`${process.env.url}/print`}
          </QRImage>
        </div>
        <div className="py-2 px-4 text-center flex flex-col gap-2">
          <span>Thank you for shoping!!!</span>
          <span className="text-md font-semibold">
            Powered by IN<span className="text-lime-500">POS</span>ERY
          </span>
          {/* <WhatsappShareButton url={""} itemType="image">
              <WhatsappIcon size={30} />
            </WhatsappShareButton> */}
        </div>

        {/* <button onClick={() => window.print()}>print</button> */}
      </div>
    </>
  );
});

Receipt.displayName = "Receipt";
export default Receipt;
