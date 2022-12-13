import axios from "@/helper/lib/axios";
import { Navigation, Sidebar, SidebarItem } from "components";
import { useRouter } from "next/router";
import React from "react";
import useSWR, { SWRConfig } from "swr";
import useToggle from "../../helper/hooks/useToggle";

const StoreLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { id: storeId } = router.query;
  const { toggle, toggler } = useToggle();
  const basePath = "/store/[id]";
  const { data: store, error } = useSWR(
    storeId ? `/api/stores/${storeId}` : null,
    (url) =>
      axios
        .get(url)
        .then((res) => res.data)
        .catch((err) => err)
  );
  if (error && error.response.status && error.response.status === 403)
    router.replace("/403");
  if (error && error.response.status && error.response.status === 404)
    router.replace("/404");
  return (
    <div className="bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-white">
      <Navigation onClick={toggler} />
      <div className="flex h-screen overflow-hidden">
        <Sidebar isOpen={toggle}>
          <SidebarItem
            href={`/store/${router.query.id}`}
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
          {/* <SidebarItem
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
            /> */}
        </Sidebar>
        <main className="flex flex-col gap-4 w-full min-h-screen h-full overflow-x-hidden overflow-y-auto pt-20 pb-4 px-8 relative">
          {children}
        </main>
      </div>
    </div>
  );
};

export default StoreLayout;
