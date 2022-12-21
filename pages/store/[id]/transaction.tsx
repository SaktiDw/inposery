import {
  Modal,
  Pagination,
  PerPageSelect,
  ProductForm,
  SearchInput,
  StoreLayout,
  Table,
  TransactionForm,
} from "@/components/index";
import { TableColumn } from "@/components/Tables/Table";

import useToggle from "@/helper/hooks/useToggle";
import axios from "@/helper/lib/axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR, { SWRResponse } from "swr";
import qs from "qs";
import Swal from "sweetalert2";
import useAuth from "@/helper/hooks/useAuth";
import { getFetcher } from "@/helper/lib/api";
import { Transaction } from "@/helper/type/Dashboard";

type Props = {};

type Selected = {
  selected: boolean;
  id: number;
};

const TransactionPage = (props: Props) => {
  const router = useRouter();
  const storeId = router.query.id;
  const { user } = useAuth({ middleware: "auth" });

  const { toggle, toggler, setToggle } = useToggle();

  const [perPage, setPerPage] = useState("10");
  const [search, setSearch] = useState("");
  const [pageIndex, setPageIndex] = useState(1);

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
  }: SWRResponse<any> = useSWR(`/api/transactions?${query}`, getFetcher);
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
    // {
    //   title: "Action",
    //   key: "id",
    //   render: (val) => (
    //     <div className="flex gap-4">
    //       <button
    //         className="text-pink-500 text-sm font-semibold"
    //         onClick={() => handleDelete([val.id])}
    //       >
    //         <i className="fi-rr-trash"></i>
    //       </button>
    //       <button className="text-lime-500 text-sm font-semibold">
    //         <i className="fi-rr-pencil"></i>
    //       </button>
    //       <button className="text-slate-500 text-sm font-semibold">
    //         <i className="fi-rr-eye"></i>
    //       </button>
    //     </div>
    //   ),
    // },
  ];

  const handleAdd = async (input: any) => {
    const product = await axios
      .get(`/api/products/${parseInt(input.product)}`)
      .then((res) => res.data.data);

    await mutate(
      async (products: any) =>
        await axios.post("/api/transactions", input).then((res) => {
          Swal.fire(
            "Success!",
            `${res.data.data.qty} ${product.name} was added to inventory!`,
            "success"
          );
          res.status === 201 &&
            axios.patch(`/api/products/${res.data.data.product}`, {
              qty: parseInt(product.qty) + parseInt(res.data.data.qty),
            });
          // alert(JSON.stringify(res.data.data.id));
          const newData = products;
          newData.data = [...products, res.data];
          return newData;
        })
    );
  };

  const handleDelete = (ids: any) => {
    let filteredData;
    if (typeof ids !== "number") {
      let mustDelete = selected.map((item) => item.selected && item.id);
      filteredData = products.data.filter(
        (item: any) => !mustDelete.includes(item.id)
      );
      const query = qs.stringify(
        {
          where: {
            _or: [
              {
                id: {
                  _in: mustDelete,
                },
              },
            ],
          },
        },
        { encodeValuesOnly: true }
      );
      axios.delete(`/api/transactions?${query}`).then((res) => res.data);
      setSelected([]);
    } else {
      filteredData = products.data.filter((item: any) => item.id !== ids);
      axios.delete(`/api/transactions/${ids}`).then((res) => res.data);
      setSelected(selected.filter((item) => item.id !== ids));
    }
    const options = {
      optimisticData: products,
      rollbackOnError: true,
      revalidate: false,
    };
    mutate({ ...products, data: filteredData }, options);
  };

  // const handleUpdate = (ids: any) => {
  //   let filteredData;
  //   if (typeof ids !== "number") {
  //     let mustDelete = selected.map((item) => item.selected && item.id);
  //     filteredData = products.data.filter(
  //       (item: any) => !mustDelete.includes(item.id)
  //     );
  //     // mustDelete.map((item) => {
  //     //   axios.patch(`/api/transactions/${item}`, { qty: 100, store: 19 });
  //     // });
  //     const query = qs.stringify(
  //       {
  //         where: {
  //           _or: [
  //             {
  //               product: {
  //                 qty: {
  //                   _eq: 500,
  //                 },
  //               },
  //             },
  //           ],
  //         },
  //       },
  //       { encodeValuesOnly: true }
  //     );
  //     alert(query);
  //     // axios.delete(`/api/products?${query}`).then((res) => res.data);
  //     setSelected([]);
  //   }
  //   // else {
  //   //   filteredData = products.data.filter((item: any) => item.id !== ids);
  //   //   axios.delete(`/api/products/${ids}`).then((res) => res.data);
  //   //   setSelected(selected.filter((item) => item.id !== ids));
  //   // }
  //   // const options = {
  //   //   optimisticData: products,
  //   //   rollbackOnError: true,
  //   //   revalidate: false,
  //   // };
  //   // mutate({ ...products, data: filteredData }, options);
  // };

  return (
    <StoreLayout>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap justify-between sm:justify-start gap-4">
          <PerPageSelect onChange={(e) => setPerPage(e.target.value)} />
          <SearchInput onChange={(e) => setSearch(e.target.value)} />
        </div>
        {products && <Table data={products} columns={columns} />}
      </div>
      {products && <Pagination data={products} setPage={setPageIndex} />}
    </StoreLayout>
  );
};

export default TransactionPage;
