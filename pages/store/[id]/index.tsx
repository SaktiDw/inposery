import { PriceFormater, StoreDashboard } from "@/components/index";
import React from "react";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import { useAuth } from "@/helper/context/AuthContext";
import axiosInstance from "@/helper/lib/client";
import qs from "qs";
import { TransactionType } from "@/helper/type/enum";

type Props = {};

const Store = (props: Props) => {
  const router = useRouter();
  const { id: storeId } = router.query;
  const { user } = useAuth();
  const params = qs.stringify({
    where: {
      _and: [
        {
          user: user.id,
        },
      ],
    },
    populate: "products.transactions",
  });
  const { data: store, error } = useSWR(
    `/api/stores/${storeId}?${params}`,
    (url) => axiosInstance.get(url).then((res) => res.data)
  );

  if (error && error.response.status === 404) router.push("/404");
  if (!store) return <>Loading...</>;
  const IN = (transactions: any) =>
    transactions &&
    transactions
      .filter((item: any) => item.type == TransactionType.IN)
      .reduce((sum: number, record: any) => sum + record.qty * record.price, 0);
  const OUT = (transactions: any) =>
    transactions &&
    transactions
      .filter((item: any) => item.type == TransactionType.OUT)
      .reduce((sum: number, record: any) => sum + record.qty * record.price, 0);
  return (
    <StoreDashboard>
      Store Dashboard
      <div className="flex items-center gap-4 overflow-x-auto">
        <div className="rounded-lg bg-white dark:bg-slate-800 py-2 px-4">
          <div className="font-semibold text-slate-500">Sales</div>
          <PriceFormater
            className="font-bold text-lg"
            price={store.data.products
              .map((item: any) =>
                item.transactions
                  .filter((item: any) => item.type == TransactionType.OUT)
                  .reduce(
                    (sum: number, record: any) =>
                      sum + record.qty * record.price,
                    0
                  )
              )
              .reduce((sum: number, record: any) => sum + record, 0)}
          />
        </div>
      </div>
      {store.data.products &&
        store.data.products.map((item: any, index: number) => {
          let untung =
            ((OUT(item.transactions) - IN(item.transactions)) /
              IN(item.transactions)) *
            100;
          return (
            <div className="flex gap-2" key={item.id}>
              Modal: <PriceFormater price={IN(item.transactions)} />
              Terjual: <PriceFormater price={OUT(item.transactions)} />
              Untung: <PriceFormater price={untung} />
            </div>
          );
        })}
      {/* {JSON.stringify(Out)} */}
    </StoreDashboard>
  );
};

export default Store;
