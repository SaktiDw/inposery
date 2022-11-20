import React from "react";
import { Input, OrderCard, PriceFormater } from "@/components";
import axiosInstance from "@/helper/lib/client";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import useToggle from "@/helper/hooks/useToggle";
import Swal from "sweetalert2";
import { TransactionType } from "@/helper/type/enum";

type Props = {
  cart: any;
  setCart: any;
  mutation: any;
  storeId: any;
};

function CashierForm(props: Props) {
  const { toggle, toggler } = useToggle();

  const subTotal =
    props.cart.length > 0
      ? props.cart.reduce(
          (accumulator: any, item: { orderQty: number; sellPrice: number }) => {
            return accumulator + item.orderQty * item.sellPrice;
          },
          0
        )
      : 0;
  const cartItem =
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
      {/* <button
        className="fixed z-50 top-0 right-0 m-6 mr-96"
        onClick={() => toggler()}
      >
        <i className="fi-rr-shopping-cart relative">
          <div className="absolute -top-2 -right-4 min-w-min w-6 whitespace-nowrap bg-green-700 text-xs font-bold flex items-center justify-center overflow-hidden rounded-full">
            {cartItem}
          </div>
        </i>
      </button> */}
      <div
        className={` w-[300px] pt-16 pb-4 px-2 overflow-hidden flex flex-col h-screen gap-4 fixed top-0 right-0 bg-slate-100 dark:bg-slate-900 bg-opacity-50 dark:bg-opacity-50 backdrop-blur-lg
        transition-all duration-300 scroll-smooth `}
      >
        <ul className="flex flex-col gap-4 flex-1 overflow-y-auto py-4 pr-4">
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
        <div className="flex items-end gap-2 mt-auto">
          <label htmlFor="" className="font-semibold">
            Sub Total :
          </label>
          <PriceFormater price={subTotal} className="text-lg font-bold" />
        </div>
        <Formik
          initialValues={{ payment: 0, product: JSON.stringify(props.cart) }}
          enableReinitialize={true}
          validationSchema={Yup.object().shape({
            payment: Yup.number()
              .min(subTotal, `Minimal Pembayaran ${subTotal}`)
              .required("Required"),
            product: Yup.string().required(),
          })}
          onSubmit={async (values, {}) => {
            if (values.product === "[]") return;
            props.cart.map(async (item: any) => {
              await axiosInstance
                .post("/api/transactions", {
                  type: TransactionType.OUT,
                  qty: item.orderQty,
                  price: item.sellPrice,
                  product: item.id,
                  description: "",
                })
                .then((res) => {
                  axiosInstance.patch(`/api/products/${item.id}`, {
                    qty: item.qty - item.orderQty,
                  });
                });
            }),
              subTotal;
            await axiosInstance.post("/api/receipts", {
              store: props.storeId,
              product: JSON.stringify(props.cart),
              total: subTotal,
              payment: values.payment,
              change: values.payment - subTotal,
              discount: 0,
            });
            props.setCart([]);
            props.mutation();
            Swal.fire("Success!", `Transaksi berhasil!`, "success");
          }}
        >
          {({ errors, isValid }) => (
            <Form className="flex flex-col gap-2">
              <Input
                label="Payment :"
                errors={errors.payment}
                placeholder="e.g 1000"
                type="number"
                name="payment"
              />
              <button
                disabled={!isValid}
                className="w-full bg-gradient-to-tl from-green-700 to-lime-500 disabled:bg-gradient-to-tl disabled:from-green-900 disabled:to-lime-700 disabled:cursor-not-allowed py-2 px-4 rounded-lg shadow-lg"
                type="submit"
              >
                Checkout
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default CashierForm;
