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
} from "chart.js";
import useSWR from "swr";
import axios from "@/helper/lib/api";
import moment from "moment";
import _ from "lodash";
import { TransactionType } from "@/helper/type/enum";
import { filter } from "@/helper/lib/timeFilter";

type Props = {
  storeId: any;
  type: TransactionType;
  title: string;
};

enum FilterBy {
  today = "today",
  lastDays = "lastDays",
  lastSevenDays = "lastSevenDays",
  lastThirtyDays = "lastThirtyDays",
  month = "month",
  threeMonth = "threeMonth",
  year = "year",
}

const SalesChart = (props: Props) => {
  const [filterBy, setFilterBy] = useState(FilterBy.month);
  const [from, setFrom] = useState(filter.startOfMonth);
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
  const colours = [
    "#4d7e29",
    "#8dba69",
    "#939393 ",
    "#f1f1f1",
    "#0a3500",
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
          backgroundColor: colours[index],
          tension: 0.3,
        };
      }),
  };

  const filterByMonth = () => {
    setFilterBy(FilterBy.month);
    setFrom(filter.startOfMonth);
    setTo(filter.endOfMonth);
  };
  const filterByThreeMonth = () => {
    setFilterBy(FilterBy.threeMonth);
    setFrom(filter.threeMonth);
    setTo(filter.endOfMonth);
  };
  const filterByYear = () => {
    setFilterBy(FilterBy.year);
    setFrom(filter.currentYear);
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
        {props.title}
      </h3>
      <Bar options={options} data={data} className="w-full" />
      <div className="flex justify-center gap-4 text-xs uppercase w-full">
        <button
          className={`${
            filterBy == FilterBy.month && "font-bold text-lime-500"
          }`}
          onClick={() => filterByMonth()}
        >
          1 Month
        </button>
        <button
          className={`${
            filterBy == FilterBy.threeMonth && "font-bold text-lime-500"
          }`}
          onClick={() => filterByThreeMonth()}
        >
          3 Month
        </button>
        <button
          className={`${
            filterBy == FilterBy.year && "font-bold text-lime-500"
          }`}
          onClick={() => filterByYear()}
        >
          1 Year
        </button>
      </div>
    </div>
  );
};

export default SalesChart;
