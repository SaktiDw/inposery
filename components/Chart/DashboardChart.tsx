import React from "react";
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

type Props = {
  storeId: any;
  type: TransactionType;
};

const DashboardChart = (props: Props) => {
  const { data: getAllStoresTransaction } = useSWR(
    "/api/getAllStoresTransaction",
    (url) => axios.get(url).then((res) => res.data)
  );
  const colours = [
    "#4d7e29",
    "#8dba69",
    "#f1f1f1",
    "#939393 ",
    "#0a3500",
    // "rgba(255, 99, 132, 0.2)",
    // "rgba(255, 159, 64, 0.2)",
    // "rgba(255, 205, 86, 0.2)",
    // "rgba(75, 192, 192, 0.2)",
    // "rgba(54, 162, 235, 0.2)",
    // "rgba(153, 102, 255, 0.2)",
    // "rgba(201, 203, 207, 0.2)",
  ];
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
      // title: {
      //   display: true,
      //   text: "Chart.js Line Chart",
      // },
    },
  };

  const result = getAllStoresTransaction?.map((item: any) => {
    return _(item.transaction)
      .filter((item: any) => item.type === props.type)
      .groupBy((v) => moment(v.created_at).format("LTS"))
      .mapValues((v) =>
        v.reduce((sum, record) => sum + record.qty * record.price, 0)
      )
      .value();
  });
  const labels = result && Object.keys(result[0]);
  const values = result && Object.values(result);
  const data = {
    labels,
    datasets: values?.map((item: any, index: number) => {
      return {
        label: getAllStoresTransaction[index].name,
        data: item,
        borderColor: colours[index],
        backgroundColor: colours[index],
        tension: 0.3,
      };
    }),
  };
  if (!getAllStoresTransaction) return <>Loading...</>;
  return (
    <div className="relative p-4 shadow-lg rounded-xl bg-white dark:bg-slate-800">
      <h3 className="uppercase font-bold text-xs sm:text-md text-center leading-tight text-slate-500">
        Perbandingan Modal & Terjual
      </h3>
      <Bar options={options} data={data} className="w-full" />
    </div>
  );
};

export default DashboardChart;
