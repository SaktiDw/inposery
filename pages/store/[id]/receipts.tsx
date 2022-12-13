import {
  Pagination,
  PerPageSelect,
  PriceFormater,
  Receipt,
  SearchInput,
  StoreLayout,
  Table,
} from "@/components";
import axios from "@/helper/lib/axios";
import React, { useRef, useState } from "react";
import useSWR from "swr";
import qs from "qs";
import { useRouter } from "next/router";
import { TableColumn } from "@/components/Tables/Table";

type Props = {};

const Receipts = (props: Props) => {
  const router = useRouter();
  const storeId = router.query.id;
  const componentRef = useRef(null);

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
    <StoreLayout>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap justify-between sm:justify-start gap-4">
          <PerPageSelect onChange={(e) => setPerPage(e.target.value)} />
          <SearchInput onChange={(e) => setSearch(e.target.value)} />
        </div>
        {/* <Table columns={columns} data={receipts} /> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {receipts &&
            receipts.data.map((item: any) => {
              return <Receipt key={item.id} ref={componentRef} data={item} />;
            })}
        </div>
      </div>
      {receipts && <Pagination data={receipts} setPage={setPageIndex} />}
    </StoreLayout>
  );
};

export default Receipts;
