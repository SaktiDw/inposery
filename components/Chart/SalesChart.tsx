import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useSWR from "swr";
import axios from "@/helper/lib/api";
import moment from "moment";
import _ from "lodash";
import { TransactionType } from "@/helper/type/enum";

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
  const { data: transactions } = useSWR(
    `/api/transactions?filter[store_id]=${props.storeId}&limit=99999999`,
    (url) => axios.get(url).then((res) => res.data)
  );
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.lastSevenDays);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
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
      // title: {
      //   display: true,
      //   text: "Chart.js Line Chart",
      // },
    },
  };

  const filter = {
    today: moment(),
    lastDays: moment().subtract(1, "days"),
    lastSevenDays: moment().subtract(7, "days"),
    lastThirtyDays: moment().subtract(30, "days"),
    month: moment().subtract(1, "month").add(1, "day"),
    threeMonth: moment().subtract(3, "month").add(1, "day"),
    year: moment().subtract(1, "year").add(1, "day"),
  };

  var result =
    transactions &&
    _(transactions.data)
      .filter(
        (item: any) =>
          moment(item.created_at).isBetween(
            filter[filterBy],
            filter.today,
            "day",
            "[]"
          ) && item.type === props.type
      )
      .groupBy((v) =>
        moment(v.created_at).format(
          filterBy == FilterBy.today ? "dd h:00" : "LL"
        )
      )
      .mapValues((v) =>
        v.reduce((sum: any, record: any) => sum + record.qty * record.price, 0)
      )
      .value();
  const labels = result && Object.keys(result);
  const values = result && Object.values(result);
  const data = {
    labels,
    datasets: [
      {
        label: "Sales",
        data: values,
        borderColor: "#84cc16",
        backgroundColor: "#84cc16",
        tension: 0.3,
      },
    ],
  };
  if (!transactions) return <>Loading...</>;

  return (
    <div className="relative p-4 shadow-lg rounded-xl bg-white dark:bg-slate-800">
      <h3 className="uppercase font-bold text-xs sm:text-md text-center leading-tight text-slate-500">
        {props.title}
      </h3>
      <Line options={options} data={data} className="w-full" />
      <div className="flex justify-center gap-4 text-xs uppercase w-full">
        <button
          className={`${
            filterBy == FilterBy.today && "font-bold text-lime-500"
          }`}
          onClick={() => setFilterBy(FilterBy.today)}
        >
          1D
        </button>
        <button
          className={`${
            filterBy == FilterBy.lastSevenDays && "font-bold text-lime-500"
          }`}
          onClick={() => setFilterBy(FilterBy.lastSevenDays)}
        >
          1W
        </button>
        <button
          className={`${
            filterBy == FilterBy.month && "font-bold text-lime-500"
          }`}
          onClick={() => setFilterBy(FilterBy.month)}
        >
          1M
        </button>
        <button
          className={`${
            filterBy == FilterBy.threeMonth && "font-bold text-lime-500"
          }`}
          onClick={() => setFilterBy(FilterBy.threeMonth)}
        >
          3M
        </button>
        <button
          className={`${
            filterBy == FilterBy.year && "font-bold text-lime-500"
          }`}
          onClick={() => setFilterBy(FilterBy.year)}
        >
          1Y
        </button>
      </div>
    </div>
  );
};

export default SalesChart;
