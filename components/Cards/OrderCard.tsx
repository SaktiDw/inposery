import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { PriceFormater } from "@/components";

type Props = {
  index: number;
  data: any;
  onUpdate: (index: number, orderQty: number) => void;
  onDelete: (index: number) => void;
};

const OrderCard = (props: Props) => {
  return (
    <>
      <li className="bg-white dark:bg-slate-800 py-2 px-4 rounded-xl flex flex-col gap-2 relative shadow-md">
        <button
          className="bg-red-500 accent-current rounded-full absolute top-0 right-0 w-6 h-6 m-1"
          onClick={() => props.onDelete(props.index)}
        >
          <i className="fi-rr-cross-small"></i>
        </button>
        <span className="truncate text-slate-500">{props.data.name}</span>
        <div className="flex justify-between items-center">
          <PriceFormater
            price={props.data.sellPrice}
            className="text-lg font-semibold"
          />
          <div className="flex gap-2">
            <button
              className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-500 w-8 h-8 rounded-lg"
              onClick={() =>
                props.onUpdate(props.index, props.data.orderQty - 1)
              }
            >
              <i className="fi-rr-minus-small"></i>
            </button>
            <Formik
              initialValues={{ orderQty: props.data.orderQty }}
              enableReinitialize={true}
              onSubmit={(values, {}) =>
                props.onUpdate(props.index, values.orderQty)
              }
              validationSchema={Yup.object().shape({
                orderQty: Yup.number()
                  .min(0, `Minimal pesanan 1`)
                  .max(props.data.qty, `Maximal pesanan ${props.data.qty}`)
                  .required("Required"),
              })}
            >
              {({ handleChange }) => (
                <Form className="flex flex-col justify-center items-end gap-4 relative">
                  <Field
                    type="number"
                    name="orderQty"
                    className="bg-transparent w-10 text-center appearance-none"
                  />
                  <ErrorMessage
                    name="orderQty"
                    component="span"
                    className="z-20 text-red-500 absolute top-full w-max py-2 px-4 rounded bg-opacity-50 dark:bg-opacity-50 backdrop-blur-sm dark:backdrop-blur-sm bg-white dark:bg-slate-800"
                  />
                </Form>
              )}
            </Formik>
            <button
              className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-500 w-8 h-8 rounded-lg"
              onClick={() =>
                props.data.orderQty < props.data.qty &&
                props.onUpdate(props.index, props.data.orderQty + 1)
              }
            >
              <i className="fi-rr-plus-small"></i>
            </button>
          </div>
        </div>
      </li>
    </>
  );
};

export default OrderCard;
