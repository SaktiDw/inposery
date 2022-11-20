import axiosInstance from "@/helper/lib/client";
import React from "react";
import useSWR from "swr";
import { Dashboard } from "../components";

type Props = {};

const Role = (props: Props) => {
  const { data } = useSWR("/api/roles", (url) =>
    axiosInstance.get(url).then((res) => res.data)
  );
  return <Dashboard>{JSON.stringify(data)}</Dashboard>;
};

export default Role;
