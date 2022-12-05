import {
  DashboardCard,
  TransactionChart,
  StoreDashboard,
  TopProductChart,
  ModalSalesChart,
} from "@/components";
import axios from "@/helper/lib/axios";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { TransactionType } from "@/helper/type/enum";
import useAuth from "@/helper/hooks/useAuth";
import { filter } from "@/helper/lib/timeFilter";

type Props = {};

const Store = (props: Props) => {
  const router = useRouter();
  const { id: storeId } = router.query;

  const { isLoading } = useAuth({ middleware: "auth" });

  const { data: modal } = useSWR(
    !isLoading
      ? `/api/getAllStoresTransaction/?id=${storeId}&type=${TransactionType.IN}`
      : null,
    (url) => axios.get(url).then((res) => res.data)
  );
  const { data: sales } = useSWR(
    !isLoading
      ? `/api/getAllStoresTransaction/?id=${storeId}&type=${TransactionType.OUT}`
      : null,
    (url) => axios.get(url).then((res) => res.data)
  );
  const { data: todaySales } = useSWR(
    !isLoading
      ? `/api/getAllStoresTransaction/?id=${storeId}&type=${TransactionType.OUT}&from=${filter.lastDays}`
      : null,
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

  return (
    <StoreDashboard>
      <div className="grid grid-flow-col items-center gap-4">
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
          storeId={Array(storeId)}
          title="Modal"
          type={TransactionType.IN}
        />
        <TransactionChart
          storeId={Array(storeId)}
          title="Sales"
          type={TransactionType.OUT}
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <ModalSalesChart
          limit={5}
          storeId={storeId}
          title={"Comparation Modal & Sales"}
        />
        <TopProductChart
          type={TransactionType.IN}
          limit={5}
          storeId={storeId}
          title={"Comparation Top 5 Product IN"}
        />
        <TopProductChart
          type={TransactionType.OUT}
          limit={5}
          storeId={storeId}
          title={"Comparation Top 5 Product OUT"}
        />
      </div>
    </StoreDashboard>
  );
};

export default Store;
