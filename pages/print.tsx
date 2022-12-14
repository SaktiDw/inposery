import { Receipt, SubmitButton } from "@/components";
import axios from "@/helper/lib/axios";
import React, { useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import useSWR from "swr";
import ReactToPrint from "react-to-print";
import { useRouter } from "next/router";

type Props = {};

const Print = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const componentRef = useRef(null);
  const { data: receipts } = useSWR(`/api/receipts/${id}`, (url) =>
    axios.get(url).then((res) => res.data)
  );
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4">
        <Receipt ref={componentRef} data={receipts} />
        <ReactToPrint
          trigger={() => (
            <button className="print:hidden shadow-lg p-2 rounded-lg px-8 bg-slate-800 text-white dark:bg-white dark:text-slate-800">
              Print
            </button>
          )}
          content={() => componentRef.current}
        />
      </div>
    </>
  );
};

export default Print;
