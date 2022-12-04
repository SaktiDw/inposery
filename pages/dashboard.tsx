import useAuth from "@/helper/hooks/useAuth";
import axios from "@/helper/lib/axios";
import { filter } from "@/helper/lib/timeFilter";
import { TransactionType } from "@/helper/type/enum";
import _ from "lodash";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import {
  Dashboard,
  DashboardCard,
  DashboardChart,
  SalesChart,
} from "../components";

type Props = {};

const MainDashboard = (props: Props) => {
  const { user } = useAuth();
  const router = useRouter();
  const { id: storeId } = router.query;
  const { data: stores } = useSWR("/api/stores", (url) =>
    axios.get(url).then((res) => res.data)
  );
  const storesId = stores && stores.data.map((item: any) => item.id);
  // const { data: transactions } = useSWR(
  //   `/api/transactions?filter[store_id]=1,2,3&limit=99999999`,
  //   (url) => axios.get(url).then((res) => res.data)
  // );

  const { data: modal } = useSWR(
    `/api/getAllStoresTransaction/?id=${storesId}&type=${TransactionType.IN}`,
    (url) => axios.get(url).then((res) => res.data)
  );
  const { data: sales } = useSWR(
    `/api/getAllStoresTransaction/?id=${storesId}&type=${TransactionType.OUT}`,
    (url) => axios.get(url).then((res) => res.data)
  );
  const { data: todaySales } = useSWR(
    `/api/getAllStoresTransaction/?id=${storesId}&type=${TransactionType.OUT}&from=${filter.lastDays}&to=${filter.today}`,
    (url) => axios.get(url).then((res) => res.data)
  );

  const Modal =
    modal &&
    modal.reduce((sum: number, record: any) => sum + parseInt(record.total), 0);
  const Sales =
    sales &&
    sales.reduce((sum: number, record: any) => sum + parseInt(record.total), 0);
  const TodaySales =
    todaySales &&
    todaySales.reduce(
      (sum: number, record: any) => sum + parseInt(record.total),
      0
    );
  // const Sales =
  //   getAllStoresTransaction &&
  //   getAllStoresTransaction
  //     .map((item: any) =>
  //       item.transaction
  //         .filter((item: any) => item.type == TransactionType.OUT)
  //         .reduce(
  //           (sum: number, record: any) => sum + record.qty * record.price,
  //           0
  //         )
  //     )
  //     .reduce((sum: number, record: any) => sum + record, 0);
  // const today = new Date();
  // const TodaysSales =
  //   getAllStoresTransaction &&
  //   getAllStoresTransaction
  //     .map((item: any) =>
  //       item.transaction
  //         .filter(
  //           (item: any) =>
  //             item.type == TransactionType.OUT &&
  //             new Date(item.created_at).getDate() == today.getDate()
  //         )
  //         .reduce(
  //           (sum: number, record: any) => sum + record.qty * record.price,
  //           0
  //         )
  //     )
  //     .reduce((sum: number, record: any) => sum + record, 0);

  // const top =
  //   getAllStoresTransaction &&
  //   getAllStoresTransaction.map((item: any) =>
  //     _(item.transaction)
  //       .filter((item: any) => item.type == TransactionType.IN)
  //       .groupBy((v) => v.product_id)
  //       .map((item) =>
  //         item.reduce((sum: number, record: any) => sum + record.qty, 0)
  //       )
  //   );
  if (!stores) return <Dashboard>Loading...</Dashboard>;
  return (
    <Dashboard>
      <div className="grid grid-flow-col items-center gap-4 pb-6">
        <DashboardCard
          title="Total Profit"
          subtitle={Sales - Modal || 0}
          type="pricing"
        />
        <DashboardCard
          title="Total Modal"
          subtitle={Modal || 0}
          type="pricing"
        />
        <DashboardCard
          title="Total Sales"
          subtitle={Sales || 0}
          type="pricing"
        />
        <DashboardCard
          title="Today's Sales"
          subtitle={TodaySales || 0}
          type="pricing"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 w-full">
        <SalesChart
          title="Modal"
          storeId={storesId}
          type={TransactionType.IN}
        />
        <SalesChart
          title="Sales"
          storeId={storesId}
          type={TransactionType.OUT}
        />
      </div>
    </Dashboard>
  );
};

export default MainDashboard;
