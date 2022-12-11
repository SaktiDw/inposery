import axios from "@/helper/lib/axios";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React, { useState } from "react";
import useSWR from "swr";
import {
  Dashboard,
  Modal,
  Pagination,
  PerPageSelect,
  SearchInput,
  StoreCard,
  StoreForm,
} from "@/components";
import useToggle from "@/helper/hooks/useToggle";
import Swal from "sweetalert2";
import qs from "qs";
import useAuth from "@/helper/hooks/useAuth";
import { Store, StoreInput, StoresResponse } from "@/helper/type/Store";
import { AxiosResponse } from "axios";

type Props = {};

const Stores = (props: Props) => {
  const { user, isLoading } = useAuth({
    middleware: "auth",
  });

  const { toggle, toggler, setToggle } = useToggle();
  const [isEdit, setIsEdit] = useState(0);
  const defaultValues: StoreInput = {
    name: "",
    user: user?.id || 0,
    image: "",
  };
  const [initialValues, setInitialValues] = useState(defaultValues);
  const [perPage, setPerPage] = useState("10");
  const [search, setSearch] = useState("");
  const [pageIndex, setPageIndex] = useState(1);

  const query = qs.stringify(
    {
      filter: { name: `${search}` },
      limit: perPage,
      page: pageIndex,
    },
    { encodeValuesOnly: true }
  );
  const { data: stores, mutate } = useSWR(
    !isLoading ? `/api/stores?${query}` : null,
    async (url) =>
      await axios
        .get(url)
        .then((res: AxiosResponse<StoresResponse>) => res.data)
  );

  const handleAdd = async (input: StoreInput) => {
    return await axios.post("/api/stores", input).then((res) => {
      Swal.fire("Success!", `${res.data.message}`, "success");
      setToggle(false);
      setInitialValues(defaultValues);
      return mutate();
    });
  };

  const handleDelete = async (id: number) => {
    await axios
      .delete(`/api/stores/${id}`)
      .then((res) => {
        Swal.fire("Success!", `${res.data.message}`, "success");
        return mutate();
      })
      .catch((err) => Swal.fire("Error!", `${err}`, "error"));
  };

  const handleEdit = (store: Store) => {
    setToggle(true);
    setIsEdit(store.id);
    setInitialValues({
      name: store.name,
      user: store.user_id,
      image: "",
    });
  };

  const handleUpdate = async (id: number, input: StoreInput) => {
    return await axios
      .put(`/api/stores/${id}`, input)
      .then((res) => {
        Swal.fire("Success!", `${res.data.message}`, "success");
        setToggle(false);
        setInitialValues(defaultValues);
        setIsEdit(0);
        return mutate();
      })
      .catch((err) => {
        Swal.fire("Error!", `${err} log ${JSON.stringify(err)}`, "error");
        return err;
      });
  };

  return (
    <Dashboard className="flex flex-col gap-6">
      <div className="flex items-center gap-4 text-slate-500">
        <PerPageSelect onChange={(e) => setPerPage(e.target.value)} />
        <SearchInput onChange={(e) => setSearch(e.target.value)} />

        <button
          className="ml-auto py-2 px-4 rounded-lg bg-gradient-to-tl from-green-700 to-lime-500 text-white shadow-lg"
          onClick={toggler}
        >
          Add Store
        </button>
      </div>
      <Modal
        isOpen={toggle}
        close={() => {
          setToggle(false);
          setInitialValues(defaultValues);
          setIsEdit(0);
        }}
      >
        <StoreForm
          key={isEdit}
          handleAdd={handleAdd}
          handleUpdate={handleUpdate}
          isEdit={isEdit}
          initialValues={initialValues}
        />
      </Modal>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {stores &&
          stores.data.map((store: Store) => {
            return (
              <StoreCard
                key={store.id}
                data={store}
                onDelete={() => handleDelete(store.id)}
                onEdit={() => handleEdit(store)}
              />
            );
          })}
      </div>
      {stores && <Pagination data={stores} setPage={setPageIndex} />}
    </Dashboard>
  );
};

export default Stores;
