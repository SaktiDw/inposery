import { StoreDashboard } from "@/components";
import axiosInstance from "@/helper/lib/client";
import React from "react";
import useSWR from "swr";

type Props = {};

const Test = (props: Props) => {
  const { data: stores } = useSWR("/api/stores", async (url: string) => {
    await axiosInstance.get(url).then((res) => res.data);
  });
  return <StoreDashboard>{JSON.stringify(stores)}</StoreDashboard>;
};

export default Test;
