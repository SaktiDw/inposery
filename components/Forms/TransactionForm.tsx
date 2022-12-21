import { Formik, Form } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { Input, SubmitButton } from "@/components";
import { TransactionType } from "@/helper/type/enum";
import { ProductInput } from "@/helper/type/Product";

type Props = {
  mutation: (input: any) => Promise<any>;
  storeId: any;
  productId: number;
  initialValues: ProductInput;
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
      onSubmit={(values, { setSubmitting }) => {
        props
          .mutation({
            type: values.type,
            store_id: values.store_id,
            transaction: [
              {
                qty: values.qty,
                price: values.price,
                discount: values.discount,
                description: values.description,
                product_id: values.product_id,
              },
            ],
          })
          .catch((err: any) => {
            err.response && setErrorsResponse(err.response.data.message);
            setSubmitting(false);
          });
      }}
    >
      {({ isSubmitting, errors }) => (
        <Form className="flex flex-col justify-center items-stretch gap-4 ">
          <h1 className="text-2xl text-ellipsis whitespace-nowrap truncate">
            Product Name: {props.initialValues.name}
          </h1>
          <span className="text-red-500">{errorsResponse}</span>

          <Input
            errors={errors.qty}
            label="Product Quantity"
            name="qty"
            placeholder="e.g 20"
            type="number"
          />
          <Input
            label={"Product Sell Price"}
            name={"sell_price"}
            type={"number"}
            placeholder={props.initialValues.sell_price}
            defaultValue={props.initialValues.sell_price}
            disabled={true}
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

          <SubmitButton
            text={`${isSubmitting ? "Loading..." : "Submit"}`}
            disabled={isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
};

export default TransactionForm;
