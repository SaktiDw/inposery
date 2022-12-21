import { Receipt, SubmitButton } from "@/components";
import axios from "@/helper/lib/axios";
import React, { useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import useSWR, { SWRResponse } from "swr";
import ReactToPrint from "react-to-print";
import { useRouter } from "next/router";
import { getFetcher } from "@/helper/lib/api";

type Props = {};

const Print = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const componentRef = useRef(null);
  const { data: receipts, error }: SWRResponse<any> = useSWR(
    `/api/receipts/${id}`,
    getFetcher
  );
  if (error && error.response.status && error.response.status === 403)
    router.replace("/403");
  if (error && error.response.status && error.response.status === 404)
    router.replace("/404");
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
