import { Navigation, Sidebar, SidebarItem } from "components";
import { useRouter } from "next/router";
import React from "react";
import { SWRConfig } from "swr";
import useToggle from "../../helper/hooks/useToggle";

const StoreDashboard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { toggle, toggler } = useToggle();
  const basePath = "/store/[id]";
  return (
    <SWRConfig
      value={{
        onError: (error, key) => {
          if (error.status === 404) {
            router.push("/404");
          }
        },
      }}
    >
      <div className="bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-white">
        <Navigation onClick={toggler} />
        <div className="flex h-screen overflow-hidden">
          <Sidebar isOpen={toggle}>
            <SidebarItem
              href="/dashboard"
              text="Dashboard"
              active={router.pathname == `${basePath}`}
              icon="fi-rr-apps"
            />
            <SidebarItem
              href={`/store/${router.query.id}/product`}
              text="Product"
              active={router.pathname == `${basePath}/product`}
              icon="fi-rr-boxes"
            />
            <SidebarItem
              href={`/store/${router.query.id}/transaction`}
              text="Transaction"
              active={router.pathname == `${basePath}/transaction`}
              icon="fi-rr-money-check-edit"
            />
            <SidebarItem
              href={`/store/${router.query.id}/cashier`}
              text="Cashier"
              active={router.pathname == `${basePath}/cashier`}
              icon="fi-rr-store-alt"
            />
            <SidebarItem
              href={`/store/${router.query.id}/receipts`}
              text="Receipts"
              active={router.pathname == `${basePath}/receipts`}
              icon="fi-rr-credit-card"
            />
            <SidebarItem
              href="/role"
              text="Roles"
              active={router.pathname == `${basePath}/role`}
              icon="fi-rr-id-badge"
            />
            <SidebarItem
              href="/test"
              text="Test"
              active={router.pathname == `${basePath}/test`}
              icon="fi-rr-test-tube"
            />
          </Sidebar>
          <main className="w-full min-h-screen overflow-x-hidden overflow-y-auto pt-20 px-8 relative">
            {children}
          </main>
        </div>
      </div>
    </SWRConfig>
  );
};

export default StoreDashboard;
