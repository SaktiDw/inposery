import { Receipt } from "@/components";
import axios from "@/helper/lib/axios";
import React, { useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import useSWR from "swr";
import ReactToPrint from "react-to-print";

type Props = {};

const Print = (props: Props) => {
  const componentRef = useRef(null);
  const { data: receipts } = useSWR("/api/receipts/3", (url) =>
    axios.get(url).then((res) => res.data)
  );
  return (
    <>
      <div>
        <ReactToPrint
          trigger={() => <button>Print this out!</button>}
          content={() => componentRef.current}
        />
        <Receipt ref={componentRef} data={receipts} />
      </div>
    </>
  );
};

export default Print;
