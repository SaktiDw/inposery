import axios from "@/helper/lib/axios";
import React from "react";
import useSWR from "swr";
import { DashboardLayout } from "../components";

type Props = {};

const Role = (props: Props) => {
  const { data } = useSWR("/api/roles", (url) =>
    axios.get(url).then((res) => res.data)
  );
  return <DashboardLayout>{JSON.stringify(data)}</DashboardLayout>;
};

export default Role;
