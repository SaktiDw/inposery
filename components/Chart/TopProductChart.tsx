import axios from "@/helper/lib/axios";
import { filter } from "@/helper/lib/timeFilter";
import { FilterBy, TransactionType } from "@/helper/type/enum";
import React, { useState } from "react";
import useSWR from "swr";
import ComparationChart from "./ComparationChart";
import FilterChart from "./FilterChart";

type Props = {
  type: TransactionType;
  limit: number;
  storeId: any;
  title: string;
};

const TopProductChart = (props: Props) => {
  const [filterBy, setFilterBy] = useState(FilterBy.threeMonth);
  const [from, setFrom] = useState(filter.threeMonth);
  const [to, setTo] = useState("");
  const { data: topProduct } = useSWR(
    `/api/getTopProduct/?id=${props.storeId}&type=${props.type}&from=${from}&to=${to}&limit=${props.limit}`,
    (url: string) => axios.get(url).then((res) => res.data)
  );
  return (
    <>
      <ComparationChart
        labels={topProduct && topProduct.map((item: any) => item.product.name)}
        data={topProduct && topProduct.map((item: any) => item.total)}
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

export default TopProductChart;
