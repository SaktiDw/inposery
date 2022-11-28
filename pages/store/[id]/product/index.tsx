import {
  Modal,
  Pagination,
  PerPageSelect,
  PriceFormater,
  ProductForm,
  SearchInput,
  StoreDashboard,
  Table,
  TransactionForm,
} from "@/components/index";
import { TableColumn } from "@/components/Tables/Table";

import useToggle from "@/helper/hooks/useToggle";
import axios from "@/helper/lib/api";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Swal from "sweetalert2";
import useSWR from "swr";
import qs from "qs";
import Link from "next/link";
import useAuth from "@/helper/hooks/useAuth";
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
  const {
    toggle: modal,
    toggler: modalToggler,
    setToggle: setModalToggle,
  } = useToggle();

  const [perPage, setPerPage] = useState("10");
  const [search, setSearch] = useState("");
  const [pageIndex, setPageIndex] = useState(1);

  const query = qs.stringify(
    {
      filter: { name: `${search}`, store_id: storeId },
      limit: perPage,
      page: pageIndex,
    },
    { encodeValuesOnly: true }
  );

  const {
    data: products,
    error,
    mutate,
  } = useSWR(`/api/products?${query}`, (url) =>
    axios.get(url).then((res) => res.data)
  );
  const [selected, setSelected] = useState<Selected[]>([]);
  const columns: TableColumn<any>[] = [
    { title: "#", key: "id", dataType: "numbering" },
    { title: "Name", key: "name" },
    {
      title: "Price",
      key: "sell_price",
      render: (val) => <PriceFormater price={val.sell_price} />,
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
          <button
            onClick={() => handleAddStockModal(val)}
            className="text-blue-500 text-sm font-semibold"
          >
            <i className="fi-rr-plus"></i>
          </button>
        </div>
      ),
    },
  ];
  const defaultValue = {
    name: "",
    sell_price: "",
    store_id: "",
    image: "",
  };
  const [initialValues, setInitialValues] = useState(defaultValue);
  const [productId, setproductId] = useState(0);

  const handleAdd = async (input: any) => {
    input.store_id = storeId;
    await mutate(
      async (products: any) =>
        await axios.post("/api/products", input).then((res) => {
          Swal.fire("Success!", `${res.data.message}`, "success");
          setInitialValues(defaultValue);
          setToggle(false);
          setproductId(0);
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
      let mustDelete = selected
        .filter((item) => item !== null)
        .filter((item) => item.selected)
        .map((item) => item.id);
      filteredData = products.data.filter(
        (item: any) => !mustDelete.includes(item.id)
      );

      axios
        .delete(`/api/products/${mustDelete}`)
        .then((res) => Swal.fire("Success!", `${res.data.message}`, "success"));
      setSelected([]);
      mutate({ ...products, data: filteredData }, options);
    }
    if (typeof ids == "number") {
      filteredData = products.data.filter((item: any) => item.id !== ids);
      axios
        .delete(`/api/products/${ids}`)
        .then((res) => Swal.fire("Success!", `${res.data.message}`, "success"));
      setSelected(selected.filter((item) => item.id !== ids));
      mutate({ ...products, data: filteredData }, options);
    }
    return;
  };
  const handleEdit = (product: any) => {
    setToggle(true);
    setproductId(product.id);
    setInitialValues({
      name: product.name,
      sell_price: product.sell_price,
      store_id: product.store_id,
      image: "",
    });
  };
  const handleUpdate = async (id: any, input: any) => {
    let filteredData: string | number;
    filteredData = products.data.findIndex((item: any) => item.id === id);
    const options = {
      optimisticData: products,
      rollbackOnError: true,
      revalidate: false,
    };
    return await mutate(async (products: any) => {
      return await axios.patch(`/api/products/${id}`, input).then((res) => {
        Swal.fire("Success!", `${res.data.message}`, "success");
        setToggle(false);
        setInitialValues(defaultValue);
        setproductId(0);
        const updatedData = products;
        updatedData.data[filteredData] = res.data.data;
        return updatedData;
      });
    }, options);
  };
  const handleAddStockModal = (product: any) => {
    setModalToggle(true);
    setproductId(product.id);
  };
  const handleAddStock = async (input: any) => {
    // const product = await axios
    //   .get(`/api/products/${parseInt(input.product)}`)
    //   .then((res) => res.data.data);

    return await axios.post("/api/transactions", input).then((res) => {
      Swal.fire("Success!", `${res.data.message}`, "success");
      mutate();
      setModalToggle(false);
      setproductId(0);
      // res.status === 201 &&
      //   axios
      //     .patch(`/api/products/${res.data.data.product}`, {
      //       qty: parseInt(product.qty) + parseInt(res.data.data.qty),
      //     })
      //     .then((res) => {
      //       const filteredData = products.data.findIndex(
      //         (item: any) => item.id === res.data.id
      //       );
      //       mutate(async (products: any) => {
      //         const updatedData = products;
      //         updatedData.data[filteredData] = res.data;
      //         return updatedData;
      //       });
      //     });
    });
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
          </>
        )}
      </div>
      {products && <Pagination data={products} setPage={setPageIndex} />}
      <Modal
        isOpen={toggle}
        close={() => {
          setToggle(false);
          setInitialValues(defaultValue);
          setproductId(0);
        }}
      >
        <ProductForm
          handleAdd={handleAdd}
          handleUpdate={handleUpdate}
          isEdit={productId}
          key={productId}
          initialValues={initialValues}
        />
      </Modal>
      <Modal isOpen={modal} close={() => setModalToggle(false)}>
        <TransactionForm
          mutation={handleAddStock}
          storeId={storeId}
          productId={productId}
        />
      </Modal>
    </StoreDashboard>
  );
};

export default Products;
