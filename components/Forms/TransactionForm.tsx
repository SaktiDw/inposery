import axiosInstance from "@/helper/lib/client";
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
};
const storeSchema = Yup.object().shape({
  type: Yup.string()
    .min(1, "Too Short!")
    .max(3, "Too Long!")
    .required("Required"),
  qty: Yup.number().min(1).required("Required"),
  price: Yup.number().required("Required"),
  description: Yup.string().max(50),
  product: Yup.string().required("Required"),
});

const ProductForm = (props: Props) => {
  const query = qs.stringify(
    {
      where: {
        _and: [
          {
            store: {
              _eq: props.storeId,
            },
          },
        ],
      },
      perPage: 10000,
    },
    { encodeValuesOnly: true }
  );
  const { data, error } = useSWR(`/api/products?${query}`, (url) =>
    axiosInstance.get(url).then((res) => res.data.data)
  );
  const [errorsResponse, setErrorsResponse] = useState([]);
  if (errorsResponse.length > 0)
    setTimeout(() => {
      setErrorsResponse([]);
    }, 10000);

  return (
    <Formik
      initialValues={{
        type: TransactionType.IN,
        qty: "",
        price: "",
        description: "",
        product: "",
      }}
      validationSchema={storeSchema}
      onSubmit={async (values, { setSubmitting }) => {
        props
          .mutation(values)
          .catch(
            (err: any) =>
              err.response && setErrorsResponse(err.response.data.errors)
          );
      }}
    >
      {({ isSubmitting, errors }) => (
        <Form className="flex flex-col justify-center items-stretch gap-4 ">
          {errorsResponse &&
            errorsResponse.map((err: any, index: any) => {
              return (
                <span key={index} className="text-red-500">
                  {err.message}
                </span>
              );
            })}
          <Input
            errors={errors.product}
            label="Product"
            name="product"
            placeholder="Select Product"
            type="select"
            defaultValue="Select Product"
          >
            {data &&
              data.map((item: any) => {
                return (
                  <option
                    key={item.id}
                    className="bg-white dark:bg-slate-800"
                    value={item.id}
                  >
                    {item.name}
                  </option>
                );
              })}
          </Input>
          <Input
            errors={errors.qty}
            label="Product Quantity"
            name="qty"
            placeholder="e.g 20"
            type="number"
          />
          <Input
            errors={errors.price}
            label="Product Price"
            name="price"
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
            disabled={isSubmitting}
            className="bg-gradient-to-tl from-green-700 to-lime-500  disabled:bg-lime-50 font-semibold shadow-lg py-2 px-4 rounded-lg "
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;
