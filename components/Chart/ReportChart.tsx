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
  Filler,
} from "chart.js";

import _ from "lodash";
import { TransactionType } from "@/helper/type/enum";
import { DashboardResponse } from "@/helper/type/Dashboard";

type Props = {
  data: DashboardResponse[];
  title: string;
  type: TransactionType;
};

const ReportChart = (props: Props) => {
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
    props.data && props.data && props.data.map((item) => item.name);
  const datas =
    props.data &&
    props.data &&
    props.data.map((item) =>
      item.transaction
        .filter((item) => item.type == TransactionType.IN)
        .map((item) => {
          return {
            total: parseInt(item.total),
            year: item.year.toString(),
            month: item.month.toString(),
          };
        })
    );

  const data = {
    datasets: datas.map((item, index) => {
      return {
        fill: true,
        label: `${labels[index]}`,
        data: item,
        parsing: {
          xAxisKey: "month",
          yAxisKey: "total",
        },
        borderColor: colours[index],
        backgroundColor: backgroundColor[index],
        tension: 0.3,
      };
    }),
  };

  if (!props.data)
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
    </div>
  );
};

export default ReportChart;
