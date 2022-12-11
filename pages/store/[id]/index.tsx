import {
  DashboardCard,
  StoreDashboard,
  TopProductChart,
  ModalSalesChart,
  ReportChart,
  ComparationChart,
} from "@/components";
import axios from "@/helper/lib/axios";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { TransactionType } from "@/helper/type/enum";
import useAuth from "@/helper/hooks/useAuth";
import { AxiosResponse } from "axios";
import { DashboardResponse } from "@/helper/type/Dashboard";

type Props = {};

const Store = (props: Props) => {
  const router = useRouter();
  const { id: storeId } = router.query;

  const { isLoading } = useAuth({ middleware: "auth" });

  const { data: dashboard } = useSWR(`/api/asd/?id=${storeId}`, (url) =>
    axios.get(url).then((res: AxiosResponse<DashboardResponse[]>) => res.data)
  );

  const total_in = dashboard
    ? dashboard.reduce(
        (sum: number, record: DashboardResponse) =>
          record.total_in ? sum + parseInt(record.total_in) : sum + 0,
        0
      )
    : 0;
  const total_in_today = dashboard
    ? dashboard.reduce(
        (sum: number, record: DashboardResponse) =>
          record.total_in_today
            ? sum + parseInt(record.total_in_today)
            : sum + 0,
        0
      )
    : 0;
  const total_in_yesterday = dashboard
    ? dashboard.reduce(
        (sum: number, record: DashboardResponse) =>
          record.total_in_yesterday
            ? sum + parseInt(record.total_in_yesterday)
            : sum + 0,
        0
      )
    : 0;
  const total_out = dashboard
    ? dashboard.reduce(
        (sum: number, record: DashboardResponse) =>
          record.total_out ? sum + parseInt(record.total_out) : sum + 0,
        0
      )
    : 0;
  const total_out_today = dashboard
    ? dashboard.reduce(
        (sum: number, record: DashboardResponse) =>
          record.total_out_today
            ? sum + parseInt(record.total_out_today)
            : sum + 0,
        0
      )
    : 0;

  const total_out_yesterday = dashboard
    ? dashboard.reduce(
        (sum: number, record: DashboardResponse) =>
          record.total_out_yesterday
            ? sum + parseInt(record.total_out_yesterday)
            : sum + 0,
        0
      )
    : 0;

  if (!dashboard) return <StoreDashboard>Loading...</StoreDashboard>;

  return (
    <StoreDashboard>
      <div className="grid grid-cols-2 sm:grid-cols-none sm:grid-flow-col items-center gap-4">
        <DashboardCard
          title="Total Profit"
          subtitle={total_out - total_in || 0}
          type="pricing"
        />
        <DashboardCard
          title="Total Modal"
          subtitle={total_in || 0}
          type="pricing"
        />
        <DashboardCard
          title="Total Sales"
          subtitle={total_out || 0}
          type="pricing"
        />
        <DashboardCard
          title="Today's Sales"
          subtitle={total_out_today || 0}
          type="pricing"
          diff={
            total_out_yesterday !== 0
              ? (10 - total_out_yesterday) / total_out_yesterday
              : 100
          }
        />
        <DashboardCard
          title="Yesterday's Sales"
          subtitle={total_out_yesterday || 0}
          type="pricing"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <ReportChart
          data={dashboard}
          title={"All Product Cost"}
          type={TransactionType.IN}
        />
        <ReportChart
          data={dashboard}
          title={"Sales"}
          type={TransactionType.OUT}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <ComparationChart
          labels={["Modal", "Sales"]}
          data={[total_in, total_out]}
          title={"Comparation Modal & Sales All Time"}
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
