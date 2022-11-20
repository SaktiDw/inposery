import {
  Modal,
  Pagination,
  PerPageSelect,
  ProductForm,
  SearchInput,
  StoreDashboard,
  Table,
  TransactionForm,
} from "@/components/index";
import { TableColumn } from "@/components/Tables/Table";
import { useAuth } from "@/helper/context/AuthContext";
import useToggle from "@/helper/hooks/useToggle";
import axiosInstance from "@/helper/lib/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";
import qs from "qs";
import Swal from "sweetalert2";

type Props = {};

type Selected = {
  selected: boolean;
  id: number;
};

const Transaction = (props: Props) => {
  const router = useRouter();
  const storeId = router.query.id;
  const { user } = useAuth();

  const { toggle, toggler, setToggle } = useToggle();

  const [perPage, setPerPage] = useState("10");
  const [search, setSearch] = useState("");
  const [pageIndex, setPageIndex] = useState(1);

  const query = qs.stringify(
    {
      populate: "product",
      where: {
        _and: [
          {
            // type: "IN",
            product: {
              name: {
                _like: `%${search}%`,
              },
              store: storeId,
            },
          },
        ],
      },
      perPage,
      page: pageIndex,
    },
    { encodeValuesOnly: true }
  );
  const {
    data: products,
    error,
    mutate,
  } = useSWR(`/api/transactions?${query}`, (url) =>
    axiosInstance.get(url).then((res) => res.data)
  );
  const [selected, setSelected] = useState<Selected[]>([]);

  const columns: TableColumn<any>[] = [
    { title: "#", key: "id", dataType: "numbering" },
    {
      title: "Name",
      key: "product",
      render(val, index) {
        return val.product.name;
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
      title: "Action",
      key: "id",
      render: (val) => (
        <div className="flex gap-4">
          <button
            className="text-pink-500 text-sm font-semibold"
            onClick={() => handleDelete([val.id])}
          >
            <i className="fi-rr-trash"></i>
          </button>
          <button className="text-lime-500 text-sm font-semibold">
            <i className="fi-rr-pencil"></i>
          </button>
          <button className="text-slate-500 text-sm font-semibold">
            <i className="fi-rr-eye"></i>
          </button>
        </div>
      ),
    },
  ];

  const handleAdd = async (input: any) => {
    const product = await axiosInstance
      .get(`/api/products/${parseInt(input.product)}`)
      .then((res) => res.data.data);

    await mutate(
      async (products: any) =>
        await axiosInstance.post("/api/transactions", input).then((res) => {
          Swal.fire(
            "Success!",
            `${res.data.data.qty} ${product.name} was added to inventory!`,
            "success"
          );
          res.status === 201 &&
            axiosInstance.patch(`/api/products/${res.data.data.product}`, {
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
      axiosInstance
        .delete(`/api/transactions?${query}`)
        .then((res) => res.data);
      setSelected([]);
    } else {
      filteredData = products.data.filter((item: any) => item.id !== ids);
      axiosInstance.delete(`/api/transactions/${ids}`).then((res) => res.data);
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
  //     //   axiosInstance.patch(`/api/transactions/${item}`, { qty: 100, store: 19 });
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
  //     // axiosInstance.delete(`/api/products?${query}`).then((res) => res.data);
  //     setSelected([]);
  //   }
  //   // else {
  //   //   filteredData = products.data.filter((item: any) => item.id !== ids);
  //   //   axiosInstance.delete(`/api/products/${ids}`).then((res) => res.data);
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
    <StoreDashboard>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <PerPageSelect onChange={(e) => setPerPage(e.target.value)} />
          <SearchInput onChange={(e) => setSearch(e.target.value)} />
          <button
            className="ml-auto py-2 px-4 shadow-lg rounded-lg bg-gradient-to-tl from-red-700 to-pink-500 text-white"
            onClick={() => handleDelete(selected)}
          >
            Delete Many
          </button>

          <button
            className=" py-2 px-4 shadow-lg rounded-lg bg-gradient-to-tl from-green-700 to-lime-500 text-white "
            onClick={toggler}
          >
            Add
          </button>
        </div>
        {products && (
          <>
            <Table
              data={products}
              columns={columns}
              selected={selected}
              setSelected={setSelected}
            />
            <Pagination meta={products.meta} setPage={setPageIndex} />
          </>
        )}
      </div>
      <Modal isOpen={toggle} close={() => setToggle(false)}>
        <TransactionForm mutation={handleAdd} storeId={storeId} />
      </Modal>
    </StoreDashboard>
  );
};

export default Transaction;
