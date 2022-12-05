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
  TransactionChart,
} from "../components";

type Props = {};

const MainDashboard = (props: Props) => {
  const { isLoading } = useAuth({ middleware: "auth" });
  const router = useRouter();
  const { data: stores } = useSWR("/api/stores", (url) =>
    axios.get(url).then((res) => res.data)
  );
  const storesId = stores && stores.data.map((item: any) => item.id);

  const { data: modal } = useSWR(
    `/api/getAllStoresTransaction/?id=${storesId}&type=${TransactionType.IN}`,
    (url) => axios.get(url).then((res) => res.data)
  );
  const { data: sales } = useSWR(
    `/api/getAllStoresTransaction/?id=${storesId}&type=${TransactionType.OUT}`,
    (url) => axios.get(url).then((res) => res.data)
  );
  const { data: todaySales } = useSWR(
    `/api/getAllStoresTransaction/?id=${storesId}&type=${TransactionType.OUT}&from=${filter.lastDays}`,
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

  if (isLoading) return <Dashboard>Loading...</Dashboard>;
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
        <TransactionChart
          title="Modal"
          storeId={storesId}
          type={TransactionType.IN}
        />
        <TransactionChart
          title="Sales"
          storeId={storesId}
          type={TransactionType.OUT}
        />
      </div>
    </Dashboard>
  );
};

export default MainDashboard;
