import {
  Pagination,
  PerPageSelect,
  SearchInput,
  StoreLayout,
  Table,
} from "@/components/index";
import { TableColumn } from "@/components/Tables/Table";

import axios from "@/helper/lib/axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import qs from "qs";

type Props = {};

type Selected = {
  selected: boolean;
  id: number;
};

const Transaction = (props: Props) => {
  const router = useRouter();
  const storeId = router.query.id;
  const params = router.query;
  useEffect(() => {
    setPerPage(params.limit);
  }, [router.isReady, params.limit]);
  const [perPage, setPerPage] = useState<any>(params.limit || 10);
  const [search, setSearch] = useState("");
  const [pageIndex, setPageIndex] = useState<any>(params.page);

  const query = qs.stringify(
    {
      filter: { "product.name": `${search}`, store_id: storeId },
      limit: perPage,
      page: pageIndex,
    },
    { encodeValuesOnly: true }
  );
  const {
    data: products,
    error,
    mutate,
  } = useSWR(`/api/test?${query}`, (url) =>
    axios.get(url).then((res) => res.data)
  );
  const [selected, setSelected] = useState<Selected[]>([]);

  const columns: TableColumn<any>[] = [
    { title: "#", key: "id", dataType: "numbering" },
    {
      title: "Name",
      key: "product",
      render(val, index) {
        return val.product?.name;
      },
    },
    {
      title: "Price",
      key: "price",
      render: (val) => (
        <div className="flex gap-4">
          {val.price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        </div>
      ),
    },
    { title: "Quantity", key: "qty" },
    { title: "Type", key: "type" },
    {
      title: "Date",
      key: "created_at",
      render: (val) => new Date(val.created_at).toLocaleString(),
    },
  ];

  return (
    <StoreLayout>
      {/* {perPage} {params.limit} */}
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <PerPageSelect onChange={(e) => setPerPage(e.target.value)} />
          <SearchInput onChange={(e) => setSearch(e.target.value)} />
        </div>
        {products && (
          <>
            <Table data={products} columns={columns} />
          </>
        )}
      </div>
      {products && <Pagination data={products} setPage={setPageIndex} />}
    </StoreLayout>
  );
};

export default Transaction;
