import {
  Pagination,
  PerPageSelect,
  PriceFormater,
  SearchInput,
  StoreDashboard,
  Table,
} from "@/components";
import axiosInstance from "@/helper/lib/client";
import React, { useState } from "react";
import useSWR from "swr";
import qs from "qs";
import { useRouter } from "next/router";
import { TableColumn } from "@/components/Tables/Table";

type Props = {};

const Receipts = (props: Props) => {
  const router = useRouter();
  const storeId = router.query.id;
  const [pageIndex, setPageIndex] = useState(1);
  const [perPage, setPerPage] = useState("10");
  const [search, setSearch] = useState("");
  const params = qs.stringify(
    {
      where: {
        _and: [
          {
            store: storeId,
          },
        ],
        _or: [
          {
            product: {
              _like: `%${search}%`,
            },
          },
        ],
      },
      page: pageIndex,
      perPage: perPage,
    },
    { encodeValuesOnly: true }
  );
  const {
    data: receipts,
    error,
    mutate,
  } = useSWR(`/api/receipts?${params}`, (url) =>
    axiosInstance.get(url).then((res) => res.data)
  );

  const columns: TableColumn<any>[] = [
    { title: "#", key: "id", dataType: "numbering" },
    {
      title: "Products",
      key: "id",
      render: (val) =>
        JSON.parse(val.product).map((item: any) => {
          return (
            <>
              <div>Product: {item.name}</div>
              <div>qty: {item.orderQty}</div>
              <PriceFormater price={item.sellPrice} />
            </>
          );
        }),
    },
    {
      title: "Income",
      key: "id",
      render: (val) => (
        <>
          <div>Payment: {val.payment}</div>
          <div>Change: {val.change}</div>
          <div>Total: {val.total}</div>
        </>
      ),
    },
    {
      title: "Date",
      key: "createdAt",
      render: (val) => new Date(val.createdAt).toString(),
    },
  ];
  return (
    <StoreDashboard>
      <div className="flex flex-col gap-4">
        receipts
        <div className="flex gap-4">
          <PerPageSelect onChange={(e) => setPerPage(e.target.value)} />
          <SearchInput onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Table columns={columns} data={receipts} />
        {receipts && <Pagination meta={receipts.meta} setPage={setPageIndex} />}
      </div>
    </StoreDashboard>
  );
};

export default Receipts;
