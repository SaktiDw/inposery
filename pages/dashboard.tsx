import { useAuth } from "@/helper/context/AuthContext";
import React from "react";
import { Dashboard } from "../components";

type Props = {};

const MainDashboard = (props: Props) => {
  const { user } = useAuth();
  return (
    <Dashboard>
      Dashboard
      <span>{JSON.stringify(user, null, 2)}</span>
    </Dashboard>
  );
};

export default MainDashboard;
