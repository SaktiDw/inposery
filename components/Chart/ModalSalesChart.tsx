import axios from "@/helper/lib/axios";
import { filter } from "@/helper/lib/timeFilter";
import { FilterBy, TransactionType } from "@/helper/type/enum";
import React, { useState } from "react";
import useSWR from "swr";
import ComparationChart from "./ComparationChart";
import FilterChart from "./FilterChart";

type Props = {
  // type: TransactionType;
  limit: number;
  storeId: any;
  title: string;
};

const ModalSales = (props: Props) => {
  const [filterBy, setFilterBy] = useState(FilterBy.threeMonth);
  const [from, setFrom] = useState(filter.threeMonth);
  const [to, setTo] = useState("");
  const { data } = useSWR(
    `/api/getModalSales/?id=${props.storeId}&from=${from}&to=${to}&limit=${props.limit}`,
    (url: string) => axios.get(url).then((res) => res.data)
  );
  return (
    <>
      <ComparationChart
        labels={data && data.map((item: any) => item.type)}
        data={data && data.map((item: any) => item.total)}
        title={props.title}
      >
        <FilterChart
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          from={setFrom}
          to={setTo}
        />
      </ComparationChart>
    </>
  );
};

export default ModalSales;
