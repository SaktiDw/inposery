import React, { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  Filler,
} from "chart.js";
import useSWR from "swr";
import axios from "@/helper/lib/api";
import moment from "moment";
import _ from "lodash";
import { FilterBy, TransactionType } from "@/helper/type/enum";
import { filter } from "@/helper/lib/timeFilter";
import FilterChart from "./FilterChart";

type Props = {
  storeId: any;
  type: TransactionType;
  title: string;
};

const TransactionChart = (props: Props) => {
  const [filterBy, setFilterBy] = useState(FilterBy.threeMonth);
  const [from, setFrom] = useState(filter.threeMonth);
  const [to, setTo] = useState("");
  const { data: transaction, error } = useSWR(
    () =>
      `/api/getAllStoresTransaction/?id=${props.storeId}&type=${props.type}&from=${from}&to=${to}`,
    (url: string) => axios.get(url).then((res) => res.data)
  );

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Filler,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };
  const colours = ["#4d7e29", "#8dba69", "#939393 ", "#f1f1f1", "#0a3500"];
  const backgroundColor = [
    "#4d7e296b",
    "rgba(255, 99, 132, 0.2)",
    "rgba(255, 159, 64, 0.2)",
    "rgba(255, 205, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(201, 203, 207, 0.2)",
  ];
  const labels =
    transaction &&
    Object.keys(
      _(transaction)
        .groupBy((v) => v.month)
        .value()
    );

  const data = {
    labels,
    datasets:
      props.storeId &&
      props.storeId!.map((item: any, index: number) => {
        return {
          fill: true,
          label:
            transaction &&
            transaction
              .filter((val: any) => val.store_id == item)
              .map((val: any) => val.store.name)[0],
          data:
            transaction &&
            transaction
              .filter((val: any) => val.store_id == item)
              .map((val: any) => val.total),
          borderColor: colours[index],
          backgroundColor: backgroundColor[index],
          tension: 0.3,
        };
      }),
  };

  if (error)
    return (
      <div className="h-full animate-pulse relative p-4 shadow-lg rounded-xl bg-white dark:bg-slate-800 flex justify-center items-center">
        {error.response.data.message}
      </div>
    );
  if (!transaction)
    return (
      <div className="h-full animate-pulse relative p-4 shadow-lg rounded-xl bg-white dark:bg-slate-800 flex justify-center items-center">
        Loading...
      </div>
    );

  return (
    <div className="relative p-4 shadow-lg rounded-xl bg-white dark:bg-slate-800">
      <h3 className="uppercase font-bold text-xs sm:text-md text-center leading-tight text-slate-500">
        {props.title} {filterBy}
      </h3>
      <Bar options={options} data={data} className="w-full" />
      <FilterChart
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        from={setFrom}
        to={setTo}
      />
    </div>
  );
};

export default TransactionChart;
