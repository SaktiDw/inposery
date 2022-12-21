import React from "react";
import { Input, OrderCard, PriceFormater, SubmitButton } from "@/components";
import axios from "@/helper/lib/axios";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import useToggle from "@/helper/hooks/useToggle";
import Swal from "sweetalert2";
import { TransactionType } from "@/helper/type/enum";
import { Cart, Customer } from "@/helper/type/Cashier";
import { KeyedMutator } from "swr";
import { ProductResponse } from "@/helper/type/Product";
import { Buttons } from "@testing-library/user-event/dist/types/system/pointer/buttons";

type Props = {
  isOpen: boolean;
  close: React.Dispatch<React.SetStateAction<boolean>>;
  customer: Customer[];
  setCustomer: React.Dispatch<React.SetStateAction<Customer[]>>;
  cart: Cart[];
  setCart: React.Dispatch<React.SetStateAction<Cart[]>>;
  mutation: KeyedMutator<ProductResponse>;
  storeId: string | string[] | undefined;
};

function CashierForm(props: Props) {
  const activeCustomer = props.customer.filter((item) => item.active === true);
  const subTotal =
    props.cart.length > 0
      ? props.cart
          .filter((item) => item.customer.name === activeCustomer[0].name)
          .reduce(
            (
              accumulator: any,
              item: { orderQty: number; sell_price: number }
            ) => {
              return accumulator + item.orderQty * item.sell_price;
            },
            0
          )
      : 0;
  const cartItem: number =
    props.cart.length > 0
      ? props.cart
          .filter((item) => item.customer.name === activeCustomer[0].name)
          .reduce((accumulator: any, item: { orderQty: number }) => {
            return accumulator + item.orderQty;
          }, 0)
      : 0;

  const handleDeleteCart = (el: Cart) => {
    props.setCart(props.cart.filter((item: any) => item !== el));
  };

  const handleUpdateCart = (el: Cart, orderQty: number) => {
    const updatedCart = [...props.cart];
    const cartIndex = props.cart.findIndex((item) => item === el);
    let stock = updatedCart[cartIndex].qty;
    let order = updatedCart[cartIndex].orderQty;

    if (order > 0 && order <= stock) {
      updatedCart[cartIndex].orderQty = orderQty;
    }

    if (updatedCart[cartIndex].orderQty <= 0) {
      handleDeleteCart(el);
    } else {
      props.setCart([...updatedCart]);
    }
  };

  const handleActiveCustomer = (index: number) => {
    const newCustomer = [...props.customer];
    newCustomer.map((item) => (item.active = false));
    newCustomer[index].active = true;
    props.setCustomer(newCustomer);
  };

  const handleDeleteCustomer = (item: Customer) => {
    handleActiveCustomer(0);
    return props.setCustomer(props.customer.filter((el) => el !== item));
  };

  return (
    <>
      <div
        className={`${props.isOpen ? "w-full px-4 z-50" : "w-0"} 
        lg:w-[300px] pt-10 lg:pt-16 pb-4 lg:px-4 overflow-hidden flex flex-col h-screen gap-4 fixed top-0 right-0 bg-slate-100 dark:bg-slate-900 bg-opacity-50 dark:bg-opacity-50 backdrop-blur-lg
        transition-all duration-300 scroll-smooth `}
      >
        <button
          onClick={() => props.close(false)}
          className="fixed top-0 right-0 m-4"
        >
          <i className="fi-rr-cross"></i>
        </button>
        {/* <div className="flex flex-1 overflow-auto"> */}
        <div className="flex overflow-x-auto py-2 gap-2">
          {props.customer.map((item, index) => {
            return (
              <div
                key={item.name}
                className={`flex items-center  hover:bg-slate-500 rounded-md shadow-sm
              ${
                item.active
                  ? "text-white bg-gradient-to-tl from-green-700 to-lime-500"
                  : "bg-slate-200 dark:bg-slate-800"
              }`}
              >
                <button
                  className={`relative flex flex-shrink-0 w-max items-center gap-2 py-1 px-2 text-sm`}
                  onClick={() => handleActiveCustomer(index)}
                >
                  {item.name}
                </button>
                {item.name !== "random" && (
                  <button
                    className="p-1 h-full"
                    onClick={() => handleDeleteCustomer(item)}
                  >
                    <i className="flex items-center  fi-rr-cross-small"></i>
                  </button>
                )}
              </div>
            );
          })}
        </div>
        {/* </div> */}
        <ul className="flex flex-col gap-4 flex-1 overflow-y-auto py-2">
          {props.cart &&
            props.cart
              .filter((item) => item.customer.name === activeCustomer[0].name)
              .map((item: any, index: number) => {
                return (
                  <OrderCard
                    key={item.id}
                    data={item}
                    onUpdate={handleUpdateCart}
                    onDelete={handleDeleteCart}
                    index={index}
                  />
                );
              })}
        </ul>

        <Formik
          initialValues={{ payment: "", product: JSON.stringify(props.cart) }}
          enableReinitialize={true}
          validationSchema={Yup.object().shape({
            payment: Yup.number()
              .min(subTotal, `Minimal Pembayaran ${subTotal}`)
              .required("Required"),
            product: Yup.string().required(),
          })}
          onSubmit={async (values, {}) => {
            if (cartItem === 0) return;
            const carts = props.cart
              .filter((item) => item.customer.name === activeCustomer[0].name)
              .map((item: any) => ({
                qty: item.orderQty,
                price: item.sell_price,
                product_id: item.id,
                description: "-",
                discount: 0,
              }));
            await axios
              .post("/api/transactions", {
                transaction: carts,
                type: TransactionType.OUT,
                store_id: props.storeId,
              })
              .then((res) => {
                Swal.fire("Success!", res.data.message, "success");
                axios.post("/api/receipts", {
                  store_id: props.storeId,
                  products: JSON.stringify(props.cart),
                  total: subTotal,
                  payment: values.payment,
                  change: parseInt(values.payment) - subTotal,
                  discount: 0,
                });
                props.setCart(
                  props.cart.filter(
                    (item) => item.customer.name !== activeCustomer[0].name
                  )
                );
                if (activeCustomer[0].name !== "random")
                  handleDeleteCustomer(activeCustomer[0]);
                return props.mutation();
              })
              .catch((err) =>
                Swal.fire("Error!", err.response.data.message, "error")
              );
            // props.cart
            //   .filter((item) => item.customer.name === activeCustomer[0].name)
            //   .map(async (item: any) => {
            //     await axios
            //       .post("/api/transactions", {
            //         type: TransactionType.OUT,
            //         qty: item.orderQty,
            //         price: item.sell_price,
            //         product_id: item.id,
            //         store_id: props.storeId,
            //         description: "-",
            //         discount: 0,
            //       })
            //       .then((res) => {
            //         return props.mutation();
            //       })
            //       .catch((err) =>
            //         Swal.fire("Error!", err.response.data.message, "error")
            //       );
            //   }),
            //   subTotal;
          }}
        >
          {({ errors, isValid, isSubmitting, values }) => (
            <Form className="flex flex-col gap-2 ">
              {cartItem == 0 && (
                <span className="text-red-500">Cart is empty!!</span>
              )}
              <div className="flex items-end gap-2 mt-auto text-sm md:text-md">
                <label htmlFor="" className="font-semibold">
                  Sub Total :
                </label>
                <PriceFormater
                  price={subTotal}
                  className="text-sm md:text-lg font-bold"
                />
              </div>
              <Input
                label="Payment :"
                errors={errors.payment}
                placeholder="e.g 1000"
                type="number"
                name="payment"
                disabled={values.product === "[]"}
              />
              {isValid && parseInt(values.payment) > 0 && (
                <div className="flex items-end gap-2 mt-auto">
                  <label htmlFor="" className="font-semibold">
                    Change :
                  </label>
                  <PriceFormater
                    price={parseInt(values.payment) - subTotal}
                    className="text-lg font-bold"
                  />
                </div>
              )}
              <SubmitButton
                text={`${
                  cartItem > 0 && isSubmitting ? "Loading..." : "Checkout"
                }`}
                disabled={isSubmitting}
              />
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default CashierForm;
