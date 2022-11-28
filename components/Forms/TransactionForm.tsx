import axios from "@/helper/lib/api";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { Input } from "@/components";
import useSWR from "swr";
import qs from "qs";
import { TransactionType } from "@/helper/type/enum";

type Props = {
  mutation: any;
  storeId: any;
  productId: any;
};
const storeSchema = Yup.object().shape({
  type: Yup.string()
    .min(1, "Too Short!")
    .max(3, "Too Long!")
    .required("Required"),
  qty: Yup.number().min(1).required("Required"),
  price: Yup.number().required("Required"),
  discount: Yup.number().required("Required"),
  description: Yup.string().max(50),
  product_id: Yup.string().required("Required"),
  store_id: Yup.string().required("Required"),
});

const TransactionForm = (props: Props) => {
  const [errorsResponse, setErrorsResponse] = useState([]);
  if (errorsResponse.length > 0)
    setTimeout(() => {
      setErrorsResponse([]);
    }, 10000);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        type: TransactionType.IN,
        qty: "",
        price: "",
        description: "",
        discount: "0",
        product_id: props.productId,
        store_id: props.storeId,
      }}
      validationSchema={storeSchema}
      onSubmit={async (values, { setSubmitting }) => {
        props
          .mutation(values)
          .catch(
            (err: any) =>
              err.response && setErrorsResponse(err.response.data.message)
          );
      }}
    >
      {({ isValid, errors }) => (
        <Form className="flex flex-col justify-center items-stretch gap-4 ">
          <span className="text-red-500">{errorsResponse}</span>

          <Input
            errors={errors.qty}
            label="Product Quantity"
            name="qty"
            placeholder="e.g 20"
            type="number"
          />
          <Input
            errors={errors.price}
            label="Product Purchase Price"
            name="price"
            placeholder="e.g 2000"
            type="number"
          />
          <Input
            errors={errors.discount}
            label="Product discount"
            name="discount"
            placeholder="e.g 2000"
            type="number"
          />
          <Input
            errors={errors.description}
            label="Product description"
            name="description"
            placeholder="e.g buy from stake holder 1"
            type="text"
          />

          <button
            type="submit"
            disabled={!isValid}
            className="bg-gradient-to-tl from-green-700 to-lime-500 disabled:from-green-800 disabled:to-green-800 disabled:cursor-not-allowed font-semibold shadow-lg py-2 px-4 rounded-lg "
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default TransactionForm;
