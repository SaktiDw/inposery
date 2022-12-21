import useAuth from "@/helper/hooks/useAuth";
import { getFetcher } from "@/helper/lib/api";
import axios from "@/helper/lib/axios";
import { filter } from "@/helper/lib/timeFilter";
import { DashboardResponse } from "@/helper/type/Dashboard";
import { TransactionType } from "@/helper/type/enum";
import { StoresResponse } from "@/helper/type/Store";
import { AxiosResponse } from "axios";
import _ from "lodash";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import useSWR, { SWRResponse } from "swr";
import { DashboardLayout, DashboardCard, ReportChart } from "../components";

type Props = {};

const MainDashboard = (props: Props) => {
  const { isLoading } = useAuth({ middleware: "auth" });
  const router = useRouter();
  const { data: stores }: SWRResponse<StoresResponse> = useSWR(
    "/api/stores",
    getFetcher
  );
  const storesId = stores && stores.data.map((item: any) => item.id);

  const { data: dashboard }: SWRResponse<DashboardResponse[]> = useSWR(
    `/api/dashboard/?id=${storesId}`,
    getFetcher
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

  if (!dashboard) return <DashboardLayout>Loading...</DashboardLayout>;
  return (
    <DashboardLayout>
      <div className="grid grid-cols-2 sm:grid-cols-none sm:grid-flow-col items-center gap-4 pb-6">
        <DashboardCard
          title="Total Profit"
          subtitle={total_out - total_in}
          type="pricing"
        />
        <DashboardCard title="Total Modal" subtitle={total_in} type="pricing" />
        <DashboardCard
          title="Total Sales"
          subtitle={total_out}
          type="pricing"
        />
        <DashboardCard
          title="Today's Sales"
          subtitle={total_out_today}
          type="pricing"
          diff={
            total_out_yesterday !== 0
              ? ((total_out_today - total_out_yesterday) /
                  total_out_yesterday) *
                100
              : 0
          }
        />
        <DashboardCard
          title="Yesterday's Sales"
          subtitle={total_out_yesterday}
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
    </DashboardLayout>
  );
};

export default MainDashboard;
