import useAuth from "@/helper/hooks/useAuth";
import axios from "@/helper/lib/axios";
import { TransactionType } from "@/helper/type/enum";
import _ from "lodash";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { Dashboard, DashboardCard, DashboardChart } from "../components";

type Props = {};

const MainDashboard = (props: Props) => {
  const { user } = useAuth();
  const router = useRouter();
  const { id: storeId } = router.query;
  const { data: stores } = useSWR("/api/stores", (url) =>
    axios.get(url).then((res) => res.data)
  );
  const { data: transactions } = useSWR(
    `/api/transactions?filter[store_id]=1,2,3&limit=99999999`,
    (url) => axios.get(url).then((res) => res.data)
  );

  const { data: getAllStoresTransaction } = useSWR(
    "/api/getAllStoresTransaction",
    (url) => axios.get(url).then((res) => res.data)
  );

  const Modal = getAllStoresTransaction
    .map((item: any) =>
      item.transaction
        .filter((item: any) => item.type == TransactionType.IN)
        .reduce(
          (sum: number, record: any) => sum + record.qty * record.price,
          0
        )
    )
    .reduce((sum: number, record: any) => sum + record, 0);
  const Sales = getAllStoresTransaction
    .map((item: any) =>
      item.transaction
        .filter((item: any) => item.type == TransactionType.OUT)
        .reduce(
          (sum: number, record: any) => sum + record.qty * record.price,
          0
        )
    )
    .reduce((sum: number, record: any) => sum + record, 0);
  const today = new Date();
  const TodaysSales = getAllStoresTransaction
    .map((item: any) =>
      item.transaction
        .filter(
          (item: any) =>
            item.type == TransactionType.OUT &&
            new Date(item.created_at).getDate() == today.getDate()
        )
        .reduce(
          (sum: number, record: any) => sum + record.qty * record.price,
          0
        )
    )
    .reduce((sum: number, record: any) => sum + record, 0);

  return (
    <Dashboard>
      {/* <span>{JSON.stringify(user, null, 2)}</span>
      <span>{JSON.stringify(store, null, 2)}</span>
      <span>{JSON.stringify(transactions, null, 2)}</span> */}
      {/* <span>{JSON.stringify(store, null, 2)}</span> */}
      <div className="grid grid-flow-col items-center gap-4 pb-6">
        <DashboardCard
          title="Total Profit"
          subtitle={Sales - Modal}
          type="pricing"
        />
        <DashboardCard title="Total Modal" subtitle={Modal} type="pricing" />
        <DashboardCard title="Total Sales" subtitle={Sales} type="pricing" />
        <DashboardCard
          title="Today's Sales"
          subtitle={TodaysSales}
          type="pricing"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 w-full">
        <DashboardChart storeId={storeId} type={TransactionType.IN} />
        <DashboardChart storeId={storeId} type={TransactionType.OUT} />
      </div>
    </Dashboard>
  );
};

export default MainDashboard;
