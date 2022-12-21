import { Input, Select, Table } from "@/components";
import { TableColumn } from "@/components/Tables/Table";
import { getFetcher } from "@/helper/lib/api";
import axios from "@/helper/lib/axios";
import { Cart, Customer } from "@/helper/type/Cashier";
import { Product, ProductResponse } from "@/helper/type/Product";
import { StoresResponse } from "@/helper/type/Store";
import { Form, Formik } from "formik";
import localforage from "localforage";
import { values } from "lodash";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useSWR, { SWRResponse } from "swr";

type Props = {};

const Apitest = (props: Props) => {
  const { data, mutate }: SWRResponse<StoresResponse> = useSWR(
    "/api/stores?filter[onlyTrashed]=true",
    getFetcher
  );
  const { data: product }: SWRResponse<ProductResponse> = useSWR(
    "/api/products?filter[store_id]=14",
    getFetcher
  );

  const handleRestore = async (id: number) => {
    return await axios.get(`/api/stores/${id}/restore`).then((res) => {
      mutate(), Swal.fire("Success", res.data.message, "success");
    });
  };
  const handleDelete = async (id: number) => {
    return await axios
      .delete(`/api/stores/${id}/delete-permanent`)
      .then((res) => {
        mutate(), Swal.fire("Success", res.data.message, "success");
      });
  };

  const [cart, setCart] = useState<any>([]);
  const [customer, setCustomer] = useState<any>([]);
  // useEffect(() => {
  //   localforage.getItem("customer").then((res) => setCustomer(res));
  //   localforage.getItem("cart").then((res) => setCart(res));
  // }, [customer]);

  // let activeCustomer = customer.filter((item) => item.active);
  // const [cart, setCart] = useState<any>([]);
  // localforage.setItem("customer", []);
  let activeCustomer = customer && customer.filter((item: any) => item.active);

  // const handleAddCart = (item: any) => {
  //   const cartItem = {
  //     id: item.id,
  //     name: item.name,
  //     sell_price: item.sell_price,
  //     qty: item.qty,
  //     orderQty: 1,
  //     customer: activeCustomer[0].name,
  //   };
  //   if (
  //     cart.filter(
  //       (el: any) => el.id === item.id && el.customer === activeCustomer[0].name
  //     ).length > 0
  //   ) {
  //     const cartIndex = cart.findIndex(
  //       (el: any) => el.id === item.id && el.customer === activeCustomer[0].name
  //     );
  //     const newCart = [...cart];
  //     newCart[cartIndex].orderQty = newCart[cartIndex].orderQty + 1;
  //     return setCart(newCart);
  //   } else {
  //     return setCart([...cart, cartItem]);
  //   }
  // };
  // const fetchCustomer = async () => {
  //   const value = await localforage
  //     .getItem("customer")
  //     .then((res) => (res ? res : []));
  //   return value;
  // };
  const handleAddCart = (item: Product) => {
    const cartItem = {
      id: item.id,
      name: item.name,
      sell_price: item.sell_price,
      qty: item.qty,
      orderQty: 1,
      customer: activeCustomer[0].name,
    };
    if (
      cart.filter(
        (el: any) => el.id === item.id && el.customer === activeCustomer[0].name
      ).length > 0
    ) {
      const cartIndex = cart.findIndex(
        (el: Cart) =>
          el.id === item.id && el.customer === activeCustomer[0].name
      );
      const newCart = [...cart];
      newCart[cartIndex].orderQty = newCart[cartIndex].orderQty + 1;
      return setCart(newCart);
    } else {
      return setCart([...cart, cartItem]);
    }
  };

  const columns: TableColumn<any>[] = [
    { key: "id", title: "ID" },
    { key: "name", title: "name" },
    {
      key: "id",
      title: "Action",
      render: (val) => (
        <>
          <button onClick={() => handleRestore(val.id)}>Restore</button>
          <button onClick={() => handleDelete(val.id)}>Delete</button>
          <button onClick={() => handleAddCart(val)}>add to cart</button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Formik
        initialValues={{ name: "", active: true }}
        onSubmit={(values) => {
          customer.map((item: Customer) => (item.active = false));
          setCustomer([...customer, values]);
          // localforage
          //   .getItem<Customer[]>("customer")
          //   .then((res: Customer[] | null) => {
          //     if (res !== null) {
          //       res.map((val: any) => (val.active = false));
          //       localforage
          //         .setItem("customer", [...res, values])
          //         .then((res) => setCustomer(res));
          //     } else {
          //       localforage
          //         .setItem("customer", [values])
          //         .then((res) => setCustomer(res));
          //     }
          //   });
        }}
      >
        {({}) => (
          <Form>
            <Input
              label={"Customer"}
              name={"name"}
              type={"text"}
              placeholder={"e.g Bambang"}
            />
          </Form>
        )}
      </Formik>
      <Table columns={columns} data={product} />
      {/* {JSON.stringify(cart.filter(item=>item.cust))}s */}
      {/* {JSON.stringify(customer.filter((item) => item.active))} */}
      {/* {JSON.stringify(activeCustomer)} */}
      <br />
      {/* {JSON.stringify(
        cart.filter((item) => item.customer == activeCustomer[0].name)
      )} */}
      {/* {customer.map((item, index) => (
        <button
          className={`p-2 ${item.active ? "bg-red-800" : "bg-red-400"}`}
          onClick={() => {
            const newCustomer = [...customer];
            newCustomer.map((item) => (item.active = false));
            newCustomer[index].active = true;
            setCustomer(newCustomer);
          }}
        >
          {item.name}
        </button>
      ))}
      {JSON.stringify(cart)} */}
      {/* {JSON.stringify(fetchCustomer())} */}
      <br />
      {JSON.stringify(activeCustomer)}
      <br />
    </div>
  );
};

export default Apitest;
