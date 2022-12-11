import {
  Modal,
  Pagination,
  PerPageSelect,
  PriceFormater,
  ProductForm,
  SearchInput,
  StoreDashboard,
  TransactionForm,
} from "@/components";
import Table, { TableColumn } from "@/components/Tables/Table";
import useAuth from "@/helper/hooks/useAuth";
import useToggle from "@/helper/hooks/useToggle";
import axios from "@/helper/lib/axios";
import { Product, ProductInput, ProductResponse } from "@/helper/type/Product";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import useSWR from "swr";
import qs from "qs";

type Props = {};

type Selected = {
  selected: boolean;
  id: number;
};
const Products = (props: Props) => {
  const router = useRouter();
  const { id: storeId } = router.query;
  const { isLoading, user } = useAuth({ middleware: "auth" });

  const { toggle, toggler, setToggle } = useToggle();
  const {
    toggle: modal,
    toggler: modalToggler,
    setToggle: setModalToggle,
  } = useToggle();

  const [perPage, setPerPage] = useState<string>("10");
  const [search, setSearch] = useState<string>("");
  const [pageIndex, setPageIndex] = useState<number>(1);

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
  } = useSWR(!isLoading ? `/api/products?${query}` : null, (url) =>
    axios.get(url).then((res: AxiosResponse<ProductResponse>) => res.data)
  );

  const [selected, setSelected] = useState<number[]>([]);
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
            className="text-pink-500 text-sm flex gap-1"
            onClick={() => handleDelete(val.id)}
          >
            <i className="fi-rr-trash"></i>
            <span className="hidden lg:flex text-pink-500">Delete</span>
          </button>
          <button
            onClick={() => handleEdit(val)}
            className="text-green-700 text-sm flex gap-1"
          >
            <i className="fi-rr-pencil"></i>
            <span className="hidden lg:flex text-green-700">Edit</span>
          </button>
          <button
            onClick={() => handleAddStockModal(val)}
            className="text-blue-500 text-sm flex gap-1"
          >
            <i className="fi-rr-plus"></i>
            <span className="hidden lg:flex text-blue-500">Add Stock</span>
          </button>
        </div>
      ),
    },
  ];

  const defaultValues: ProductInput = {
    name: "",
    sell_price: "",
    store_id: "",
    image: "",
  };
  const [initialValues, setInitialValues] = useState(defaultValues);
  const [productId, setproductId] = useState(0);

  const handleAdd = async (input: ProductInput) => {
    input.store_id = storeId;
    return await axios.post("/api/products", input).then((res) => {
      Swal.fire("Success!", `${res.data.message}`, "success");
      setproductId(0);
      setToggle(false);
      setInitialValues(defaultValues);
      return mutate();
    });
  };

  const handleDelete = async (ids: any) => {
    let filteredData;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (typeof ids !== "number" && ids.length !== 0) {
          let mustDelete = selected
            .filter((item) => item !== null)
            // .filter((item) => item.selected)
            .map((item) => item);
          filteredData = products!.data.filter(
            (item: any) => !mustDelete.includes(item.id)
          );

          await axios
            .delete(`/api/products/${mustDelete}`)
            .then((res) =>
              Swal.fire("Success!", `${res.data.message}`, "success")
            );
          setSelected([]);
        }
        if (typeof ids == "number") {
          filteredData = products!.data.filter(
            (item: Product) => item.id !== ids
          );
          await axios
            .delete(`/api/products/${ids}`)
            .then((res) =>
              Swal.fire("Success!", `${res.data.message}`, "success")
            );
          setSelected(selected.filter((item) => item !== ids));
        }
      }
      return mutate();
    });
  };
  const handleEdit = (product: Product) => {
    setToggle(true);
    setproductId(product.id);
    setInitialValues({
      name: product.name,
      sell_price: product.sell_price.toString(),
      store_id: product.store_id.toString(),
      image: "",
    });
  };
  const handleUpdate = async (id: number, input: ProductInput) => {
    return await axios
      .patch(`/api/products/${id}`, input)
      .then((res) => {
        Swal.fire("Success!", `${res.data.message}`, "success");
        setToggle(false);
        setInitialValues(defaultValues);
        setproductId(0);
        return mutate();
      })
      .catch((err) => {
        Swal.fire("Error!", `${err} log ${JSON.stringify(err)}`, "error");
        return err;
      });
  };

  const handleAddStockModal = (product: Product) => {
    setModalToggle(true);
    setproductId(product.id);
  };

  const handleAddStock = async (input: ProductInput) => {
    return await axios.post("/api/transactions", input).then((res) => {
      Swal.fire("Success!", `${res.data.message}`, "success");
      setModalToggle(false);
      setproductId(0);
      return mutate();
    });
  };

  if (isLoading) return <StoreDashboard>Loading</StoreDashboard>;
  if (error)
    return (
      <StoreDashboard>
        {JSON.stringify(error.response.data.message)}
      </StoreDashboard>
    );

  return (
    <StoreDashboard>
      <div className="flex flex-wrap justify-between sm:justify-start gap-4">
        <PerPageSelect onChange={(e) => setPerPage(e.target.value)} />
        <SearchInput onChange={(e) => setSearch(e.target.value)} />
        <button
          className="sm:ml-auto py-2 px-4 shadow-lg rounded-lg bg-gradient-to-tl from-red-700 to-pink-500 text-white"
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
        <Table
          data={products}
          columns={columns}
          selected={selected}
          setSelected={setSelected}
        />
      )}

      {products && <Pagination data={products} setPage={setPageIndex} />}
      <Modal
        isOpen={toggle}
        close={() => {
          setToggle(false);
          setInitialValues(defaultValues);
          setproductId(0);
        }}
      >
        <ProductForm
          key={productId}
          handleAdd={handleAdd}
          handleUpdate={handleUpdate}
          isEdit={productId}
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
