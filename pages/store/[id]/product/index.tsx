import {
  Modal,
  Pagination,
  PerPageSelect,
  PriceFormater,
  ProductForm,
  SearchInput,
  StoreDashboard,
  Table,
} from "@/components/index";
import { TableColumn } from "@/components/Tables/Table";
import { useAuth } from "@/helper/context/AuthContext";
import useToggle from "@/helper/hooks/useToggle";
import axiosInstance from "@/helper/lib/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Swal from "sweetalert2";
import useSWR from "swr";
import qs from "qs";
import Link from "next/link";
type Props = {};

type Selected = {
  selected: boolean;
  id: number;
};

const Products = (props: Props) => {
  const router = useRouter();
  const storeId = router.query.id;
  const { user } = useAuth();

  const { toggle, toggler, setToggle } = useToggle();

  const [perPage, setPerPage] = useState("10");
  const [search, setSearch] = useState("");
  const [pageIndex, setPageIndex] = useState(1);

  const query = qs.stringify(
    {
      where: {
        _and: [
          {
            store: {
              id: storeId,
              user: user.id,
            },
            name: {
              _like: `%${search}%`,
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
  } = useSWR(`/api/products?${query}`, (url) =>
    axiosInstance.get(url).then((res) => res.data)
  );
  const [selected, setSelected] = useState<Selected[]>([]);
  const columns: TableColumn<any>[] = [
    { title: "#", key: "id", dataType: "numbering" },
    { title: "Name", key: "name" },
    {
      title: "Price",
      key: "sellPrice",
      render: (val) => <PriceFormater price={val.sellPrice} />,
    },
    { title: "Quantity", key: "qty" },
    {
      title: "Action",
      key: "id",
      render: (val) => (
        <div className="flex gap-4">
          <button
            className="text-pink-500 text-sm font-semibold"
            onClick={() => handleDelete(val.id)}
          >
            <i className="fi-rr-trash"></i>
          </button>
          <button
            onClick={() => handleEdit(val)}
            className="text-lime-500 text-sm font-semibold"
          >
            <i className="fi-rr-pencil"></i>
          </button>
          <button className="text-slate-500 text-sm font-semibold">
            <i className="fi-rr-eye"></i>
          </button>
        </div>
      ),
    },
  ];
  const defaultValue = {
    name: "",
    sellPrice: "",
    store: "",
  };
  const [initialValues, setInitialValues] = useState(defaultValue);
  const [isEdit, setIsEdit] = useState(0);

  const handleAdd = async (input: any) => {
    input.store = storeId;
    await mutate(
      async (products: any) =>
        await axiosInstance.post("/api/products", input).then((res) => {
          Swal.fire("Success!", `${res.data.data.name} was added!`, "success");
          const newData = products;
          newData.data = [...products, res.data];
          return newData;
        })
    );
  };

  const handleDelete = async (ids: any) => {
    let filteredData;
    const options = {
      optimisticData: products,
      rollbackOnError: true,
      revalidate: false,
    };
    if (typeof ids !== "number" && ids.length !== 0) {
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
      axiosInstance.delete(`/api/products?${query}`).then((res) => res.data);
      setSelected([]);
      mutate({ ...products, data: filteredData }, options);
    }
    if (typeof ids == "number") {
      filteredData = products.data.filter((item: any) => item.id !== ids);
      axiosInstance.delete(`/api/products/${ids}`).then((res) => res.data);
      setSelected(selected.filter((item) => item.id !== ids));
      mutate({ ...products, data: filteredData }, options);
    }
    return;
  };
  const handleEdit = (product: any) => {
    setToggle(true);
    setIsEdit(product.id);
    setInitialValues({
      name: product.name,
      sellPrice: product.sellPrice,
      store: product.store,
    });
  };
  const handleUpdate = async (id: any, input: any) => {
    let filteredData: string | number;
    filteredData = products.data.findIndex((item: any) => item.id === id);

    await mutate(async (products: any) => {
      await axiosInstance.patch(`/api/products/${id}`, input).then((res) => {
        Swal.fire("Success!", `${res.data.data.name} was updated!`, "success");
        const updatedData = products;
        updatedData.data[filteredData] = res.data;
        return updatedData;
      });
    });
    setToggle(false);
    setInitialValues(defaultValue);
    setIsEdit(0);
  };

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
      <Modal
        isOpen={toggle}
        close={() => {
          setToggle(false);
          setInitialValues({ name: "", sellPrice: "", store: "" });
          setIsEdit(0);
        }}
      >
        <ProductForm
          handleAdd={handleAdd}
          handleUpdate={handleUpdate}
          isEdit={isEdit}
          key={isEdit}
          initialValues={initialValues}
        />
      </Modal>

      {/* {JSON.stringify(selected, null, 2)} */}
      {/* {JSON.stringify(u, null, 2)} */}
    </StoreDashboard>
  );
};

export default Products;
