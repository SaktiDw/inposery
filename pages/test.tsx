import { StoreDashboard } from "@/components";

import axios from "@/helper/lib/api";
import React from "react";
import useSWR from "swr";
import qs from "qs";
import { TransactionType } from "@/helper/type/enum";
import _ from "lodash";
import moment from "moment";
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
import useAuth from "@/helper/hooks/useAuth";
import Image from "next/image";

type Props = {};

const Test = (props: Props) => {
  // const { user } = useAuth();
  // const params = qs.stringify({
  //   where: {
  //     _and: [
  //       {
  //         user: user?.id,
  //       },
  //     ],
  //   },
  //   populate: "products.transactions",
  // });
  // const { data: store, error } = useSWR(`/api/stores/16?${params}`, (url) =>
  //   axios.get(url).then((res) => res.data)
  // );
  // const product1 =
  //   store &&
  //   store.data.products.map((item: any) =>
  //     item.transactions.filter(
  //       (item: any) =>
  //         new Date(item.createdAt) <= new Date() &&
  //         new Date(item.createdAt) >= new Date("2022-11-21T09:27:08.949Z")
  //     )
  //   );

  // const { data: transactions } = useSWR(
  //   `/api/transactions?where[store]=16`,
  //   (url) => axios.get(url).then((res) => res.data)
  // );

  // ChartJS.register(
  //   CategoryScale,
  //   LinearScale,
  //   PointElement,
  //   LineElement,
  //   Title,
  //   Tooltip,
  //   Legend
  // );

  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: "top" as const,
  //     },
  //     title: {
  //       display: true,
  //       text: "Chart.js Line Chart",
  //     },
  //   },
  // };

  // var result =
  //   transactions &&
  //   _(transactions.data)
  //     .groupBy((v) => moment(v.createdAt).format("DD"))
  //     .mapValues((v) =>
  //       v.reduce((sum: any, record: any) => sum + record.qty * record.price, 0)
  //     )
  //     .value();
  // const labels = Object.keys(result);
  // const values = Object.values(result);
  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: "Sales",
  //       data: values,
  //       borderColor: "rgb(255, 99, 132)",
  //       backgroundColor: "rgba(255, 99, 132, 0.5)",
  //     },
  //   ],
  // };

  return (
    <StoreDashboard>
      {/* {JSON.stringify(result)}
      <Line options={options} data={data} />; */}
      <Image
        src={"http://localhost:8000/storage/2/prLCIHoULyrPnx9Q.png"}
        alt="http://localhost:8000/storage/2/prLCIHoULyrPnx9Q.png"
        fill
      />
    </StoreDashboard>
  );
};

export default Test;
