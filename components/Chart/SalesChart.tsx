import React from "react";
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
};

const SalesChart = (props: Props) => {
  const { data: transactions } = useSWR(
    `/api/transactions?filter[store_id]=${props.storeId}&limit=99999999`,
    (url) => axios.get(url).then((res) => res.data)
  );

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

  var result =
    transactions &&
    _(transactions.data)
      .filter((item: any) => item.type === props.type)
      .groupBy((v) => moment(v.created_at).format("LTS"))
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
        backgroundColor: "#15803d",
        tension: 0.3,
      },
    ],
  };
  if (!transactions) return <>Loading...</>;
  return (
    <div className="relative p-4 shadow-lg rounded-xl bg-white dark:bg-slate-800">
      <h3 className="uppercase font-bold text-xs leading-tight text-slate-500">
        Perbandingan Modal & Terjual
      </h3>
      <Line options={options} data={data} className="w-full" />
    </div>
  );
};

export default SalesChart;
