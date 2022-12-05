import {
  Pagination,
  PerPageSelect,
  PriceFormater,
  SearchInput,
  StoreDashboard,
  Table,
} from "@/components";
import axios from "@/helper/lib/api";
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
  const query = qs.stringify(
    {
      filter: { store_id: storeId },
      limit: perPage,
      page: pageIndex,
    },
    { encodeValuesOnly: true }
  );
  const {
    data: receipts,
    error,
    mutate,
  } = useSWR(`/api/receipts?${query}`, (url) =>
    axios.get(url).then((res) => res.data)
  );

  const columns: TableColumn<any>[] = [
    { title: "#", key: "id", dataType: "numbering" },
    {
      title: "Products",
      key: "id",
      render: (val) =>
        JSON.parse(val.products).map((item: any) => {
          return (
            <>
              <div>Product: {item.name}</div>
              <div>qty: {item.orderQty}</div>
              <PriceFormater price={item.sell_price} />
            </>
          );
        }),
    },
    {
      title: "Income",
      key: "id",
      render: (val) => (
        <>
          <div>
            Payment: <PriceFormater price={val.payment} />
          </div>
          <div>
            Change: <PriceFormater price={val.change} />
          </div>
          <div>
            Total: <PriceFormater price={val.total} />
          </div>
        </>
      ),
    },
    {
      title: "Date",
      key: "created_at",
      render: (val) => new Date(val.created_at).toString(),
    },
  ];
  return (
    <StoreDashboard>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap justify-between gap-4">
          <PerPageSelect onChange={(e) => setPerPage(e.target.value)} />
          <SearchInput onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Table columns={columns} data={receipts} />
      </div>
      {receipts && <Pagination data={receipts} setPage={setPageIndex} />}
    </StoreDashboard>
  );
};

export default Receipts;
