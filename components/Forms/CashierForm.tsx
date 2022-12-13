import React from "react";
import { Input, OrderCard, PriceFormater, SubmitButton } from "@/components";
import axios from "@/helper/lib/axios";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import useToggle from "@/helper/hooks/useToggle";
import Swal from "sweetalert2";
import { TransactionType } from "@/helper/type/enum";
import { Cart } from "@/helper/type/Cashier";
import { KeyedMutator } from "swr";
import { ProductResponse } from "@/helper/type/Product";

type Props = {
  isOpen: boolean;
  close: React.Dispatch<React.SetStateAction<boolean>>;
  cart: Cart[];
  setCart: React.Dispatch<React.SetStateAction<Cart[]>>;
  mutation: KeyedMutator<ProductResponse>;
  storeId: string | string[] | undefined;
};

function CashierForm(props: Props) {
  const { toggle, toggler } = useToggle();
  const subTotal =
    props.cart.length > 0
      ? props.cart.reduce(
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
      ? props.cart.reduce((accumulator: any, item: { orderQty: number }) => {
          return accumulator + item.orderQty;
        }, 0)
      : 0;

  const handleDeleteCart = (idx: number) => {
    props.setCart(
      props.cart.filter((item: any, index: number) => index !== idx)
    );
  };

  const handleUpdateCart = (index: number, orderQty: number) => {
    const updatedCart = [...props.cart];
    let stock = updatedCart[index].qty;
    let order = updatedCart[index].orderQty;

    if (order > 0 && order <= stock) {
      updatedCart[index].orderQty = orderQty;
    }
    // updatedCart[index].orderQty = orderQty;

    if (updatedCart[index].orderQty <= 0) {
      handleDeleteCart(index);
    } else {
      props.setCart([...updatedCart]);
    }
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
        <ul className="flex flex-col gap-4 flex-1 overflow-y-auto py-2">
          {props.cart &&
            props.cart.map((item: any, index: number) => {
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
          onSubmit={(values, {}) => {
            if (values.product === "[]") return;

            props.cart.map(async (item: any) => {
              await axios.post("/api/transactions", {
                type: TransactionType.OUT,
                qty: item.orderQty,
                price: item.sell_price,
                product_id: item.id,
                store_id: props.storeId,
                description: "-",
                discount: 0,
              });
              return props.mutation();
            }),
              subTotal;
            axios.post("/api/receipts", {
              store_id: props.storeId,
              products: JSON.stringify(props.cart),
              total: subTotal,
              payment: values.payment,
              change: parseInt(values.payment) - subTotal,
              discount: 0,
            });
            props.setCart([]);
            Swal.fire("Success!", `Transaksi berhasil!`, "success");
          }}
        >
          {({ errors, isValid, isSubmitting, values }) => (
            <Form className="flex flex-col gap-2">
              {values.product === "[]" && (
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
