import { useAuth } from "@/helper/context/AuthContext";

import axiosInstance from "@/helper/lib/client";

import axios, { AxiosError } from "axios";
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

type Props = {
  // res: any;
};

const Stores = (props: Props) => {
  const { user } = useAuth();
  const { toggle, toggler, setToggle } = useToggle();
  const [isEdit, setIsEdit] = useState(0);
  const defaultValues = {
    name: "",
    user: user.id,
  };
  const [initialValues, setInitialValues] = useState(defaultValues);
  const [perPage, setPerPage] = useState("10");
  const [search, setSearch] = useState("");
  const [pageIndex, setPageIndex] = useState(1);

  const query = qs.stringify(
    {
      where: {
        _and: [
          {
            user: user.id,
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
  const { data: stores, mutate } = useSWR(
    `/api/stores?${query}`,
    async (url) => await axiosInstance.get(url).then((res) => res.data)
  );

  const handleAdd = async (input: any) => {
    await mutate(
      async (stores: any) =>
        await axiosInstance.post("/api/stores", input).then((res) => {
          Swal.fire(
            "Success!",
            `${res.data.data.name} was created!`,
            "success"
          );
          setToggle(false);
          setInitialValues(defaultValues);
          const newData = stores;
          stores.data = [...stores, res.data];
          return newData;
        })
    );
    setToggle(false);
    setInitialValues(defaultValues);
    setIsEdit(0);
    return;
  };

  const handleDelete = async (id: number) => {
    const filteredData = stores.data.filter((el: any) => el.id !== id);
    const options = {
      optimisticData: stores,
      rollbackOnError: true,
      revalidate: false,
    };
    mutate({ ...stores, data: filteredData }, options);
    await axiosInstance
      .delete(`/api/stores/${id}`)
      .then((res) =>
        Swal.fire("Success!", `${res.data.data.name} was deleted!`, "success")
      );
  };

  const handleEdit = (store: any) => {
    setToggle(true);
    setIsEdit(store.id);
    setInitialValues({
      name: store.name,
      user: user.id,
    });
  };

  const handleUpdate = async (id: any, input: any) => {
    let filteredData: string | number;
    filteredData = stores.data.findIndex((item: any) => item.id === id);

    await mutate(async (stores: any) => {
      await axiosInstance.patch(`/api/stores/${id}`, input).then((res) => {
        Swal.fire("Success!", `${res.data.data.name} was updated!`, "success");
        const updatedData = stores;
        updatedData.data[filteredData] = res.data;
        return updatedData;
      });
    });
    setToggle(false);
    setInitialValues(defaultValues);
    setIsEdit(0);
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
          key={initialValues.name}
          handleAdd={handleAdd}
          handleUpdate={handleUpdate}
          isEdit={isEdit}
          initialValues={initialValues}
        />
      </Modal>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {stores &&
          stores.data.map((store: any) => {
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

      {stores && <Pagination meta={stores.meta} setPage={setPageIndex} />}
    </Dashboard>
  );
};

export default Stores;

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const res = await axios
//     .get("http://localhost:8810/api/stores", {
//       headers: {
//         Authorization: `Bearer ${ctx.req.cookies["access_token"]}`,
//       },
//     })
//     .then((res) => res.data);
//   axios.interceptors.response.use(
//     async (res) => {
//       return res;
//     },
//     async function (error: any) {
//       const originalReq = error.config;
//       if (error.response!.status === 401 && !originalReq!._retry) {
//         originalReq!._retry = true;
//         const res = await axios.get("http://localhost:8810/api/refresh-token", {
//           params: {
//             refreshToken: ctx.req.cookies["refresh_token"],
//           },
//         });
//         const access_token = await res.data.access_token;
//         axios.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${access_token}`;
//         return axios.create(originalReq);
//       }
//       return Promise.reject(error);
//     }
//   );
//   // const data = await res.data;
//   return { props: { res } };
// };
