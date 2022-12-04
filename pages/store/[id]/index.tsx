// import {
//   ComparationChart,
//   DashboardCard,
//   PriceFormater,
//   SalesChart,
//   StoreDashboard,
//   Table,
// } from "@/components/index";
// import React from "react";
// import useSWR from "swr";
// import { useRouter } from "next/router";

// import axios from "@/helper/lib/api";
// import qs from "qs";
// import { TransactionType } from "@/helper/type/enum";
// import { TableColumn } from "@/components/Tables/Table";
// import useAuth from "@/helper/hooks/useAuth";
// import Image from "next/image";

// type Props = {};

// const Store = (props: Props) => {
//   const router = useRouter();
//   const { id: storeId } = router.query;
//   const { user } = useAuth();

//   const { data: store, error } = useSWR(`/api/stores/${storeId}`, (url) =>
//     axios.get(url).then((res) => res.data)
//   );

//   // const { data: receipts } = useSWR(
//   //   `/api/receipts?where[store]=${storeId}`,
//   //   (url) => axios.get(url).then((res) => res.data)
//   // );

//   // if (error && error.response.status === 404) router.push("/404");
//   if (!store) return <StoreDashboard>Loading...</StoreDashboard>;

//   // const IN = (transaction: any) =>
//   //   transaction &&
//   //   transaction
//   //     .filter((item: any) => item.type == TransactionType.IN)
//   //     .reduce((sum: number, record: any) => sum + record.qty * record.price, 0);

//   // const OUT = (transaction: any) =>
//   //   transaction &&
//   //   transaction
//   //     .filter((item: any) => item.type == TransactionType.OUT)
//   //     .reduce((sum: number, record: any) => sum + record.qty * record.price, 0);

//   const Sales = store?.transaction
//     .filter((item: any) => item.type == TransactionType.OUT)
//     .reduce((sum: number, record: any) => sum + record.qty * record.price, 0);

//   // const Income = store?.products.map(
//   //   (item: any) =>
//   //     ((OUT(item.transaction) - IN(item.transaction)) /
//   //       IN(item.transaction)) *
//   //     100
//   // );

//   // const products = store?.products.filter(
//   //   (item: any) => item.qty > 0
//   // ).length;

//   const Modal = store?.transaction
//     .filter((item: any) => item.type === TransactionType.IN)
//     .reduce((sum: number, record: any) => sum + record.qty * record.price, 0);

//   const today = new Date();
//   // today.setHours(0);
//   const getPreviousDay = (date = new Date()) => {
//     const previous = new Date(date.getTime());
//     previous.setDate(date.getDate() - 1);

//     return previous;
//   };
//   const TodaysSales = store?.transaction
//     .filter(
//       (item: any) =>
//         item.type == TransactionType.OUT &&
//         // new Date(item.created_at) <= new Date() &&
//         new Date(item.created_at).getDate() == today.getDate()
//     )
//     .reduce((sum: number, record: any) => sum + record.qty * record.price, 0);

//   return (
//     <StoreDashboard>
//       <div className="grid grid-flow-col items-center gap-4 pb-6">
//         <DashboardCard
//           title="Total Profit"
//           subtitle={Sales - Modal}
//           type="pricing"
//         />
//         <DashboardCard title="Total Modal" subtitle={Modal} type="pricing" />
//         <DashboardCard title="Total Sales" subtitle={Sales} type="pricing" />
//         <DashboardCard
//           title="Today's Sales"
//           subtitle={TodaysSales}
//           type="pricing"
//         />
//         {/* <DashboardCard title="Total Products" subtitle={products} />
//         <DashboardCard
//           title="Total Costumer"
//           subtitle={receipts && receipts.data.length}
//         /> */}
//       </div>

//       <div className="grid grid-flow-col grid-cols-2 gap-4">
//         <ComparationChart
//           data={[Modal, Sales]}
//           labels={["Modal", "Sales"]}
//           title="Modal & Sales Comparation"
//         />
//         <div className="grid grid-flow-row gap-4">
//           <SalesChart
//             storeId={storeId}
//             title="Modal"
//             type={TransactionType.IN}
//           />
//           <SalesChart
//             storeId={storeId}
//             title="Sales"
//             type={TransactionType.OUT}
//           />
//         </div>
//       </div>
//       {/* {JSON.stringify(Sales)}
//       {JSON.stringify(Modal)}
//       {JSON.stringify(store?.transaction)}
//       <br />
//       <br /> */}

//       {/* {store && store?.media[0] && (
//         <Image
//           width={300}
//           height={300}
//           src={store?.media[0].original_url}
//           blurDataURL={store?.media[0].original_url}
//           alt=""
//         />
//       )} */}
//     </StoreDashboard>
//   );
// };

// export default Store;

import { ComparationChart, SalesChart, StoreDashboard } from "@/components";
import axios from "@/helper/lib/axios";
import { useRouter } from "next/router";
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
import moment from "moment";
import { TransactionType } from "@/helper/type/enum";

type Props = {};

const Store = (props: Props) => {
  const router = useRouter();
  const { id: storeId } = router.query;

  return (
    <StoreDashboard>
      <SalesChart
        storeId={Array(storeId)}
        title="Modal"
        type={TransactionType.IN}
      />
      <SalesChart
        storeId={Array(storeId)}
        title="Modal"
        type={TransactionType.OUT}
      />
    </StoreDashboard>
  );
};

export default Store;
