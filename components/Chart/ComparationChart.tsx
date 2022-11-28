import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

type Props = {
  labels: any[];
  data: any[];
  title: string;
};

const ComparationChart = (props: Props) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: props.labels,
    datasets: [
      {
        label: "Rp",
        data: props.data,
        backgroundColor: [
          "#15803d",
          "#84cc16",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          // "rgba(255, 206, 86, 0.2)",
          // "rgba(75, 192, 192, 0.2)",
          // "rgba(153, 102, 255, 0.2)",
          // "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "#15803d",
          "#84cc16",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          // "rgba(255, 206, 86, 1)",
          // "rgba(75, 192, 192, 1)",
          // "rgba(153, 102, 255, 1)",
          // "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
  };
  return (
    <div className="relative p-4 shadow-lg rounded-xl bg-white dark:bg-slate-800">
      <h3 className="uppercase font-bold text-xs leading-tight text-slate-500">
        {props.title}
      </h3>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default ComparationChart;
