import useAuth from "@/helper/hooks/useAuth";
import { Navigation, Sidebar, SidebarItem } from "components";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { SWRConfig } from "swr";
import useToggle from "../../helper/hooks/useToggle";

type Props = {
  className?: string;
  children: React.ReactNode;
};
const Dashboard = (props: Props) => {
  const router = useRouter();
  const { toggle, toggler } = useToggle();

  return (
    <main className="bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-white caret-lime-500 selection:bg-green-700 selection:text-white">
      <Navigation onClick={toggler} />
      <div className="flex h-screen overflow-hidden">
        <Sidebar isOpen={toggle}>
          <SidebarItem
            href="/dashboard"
            text="Dashboard"
            active={router?.pathname == "/dashboard"}
            icon="fi-rr-apps"
          />
          {/* <SidebarItem
            href="#"
            text="Employee"
            active={router?.pathname == "/Employee"}
            icon="fi-rr-users-alt"
          /> */}
          <SidebarItem
            href="/store"
            text="Store"
            active={router?.pathname == "/store"}
            icon="fi-rr-store-alt"
          />
          {/* <SidebarItem
            href="#"
            text="Billings"
            active={router?.pathname == "/Billings"}
            icon="fi-rr-credit-card"
          />
          <SidebarItem
            href="/role"
            text="Roles"
            active={router?.pathname == "/role"}
            icon="fi-rr-id-badge"
          />
          <SidebarItem
            href="/test"
            text="Test"
            active={router?.pathname == "/test"}
            icon="fi-rr-test-tube"
          /> */}
        </Sidebar>
        <div
          className={`w-full h-screen pt-20 pb-10 px-8 overflow-y-auto scroll-smooth ${props.className}`}
        >
          {props.children}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
