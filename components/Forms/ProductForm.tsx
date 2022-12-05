import { Formik, Form } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { Dropzone, Input } from "@/components";
import { ProductInput, ProductResponse } from "@/helper/type/Product";
import SubmitButton from "../Buttons/SubmitButton";

type Props = {
  handleAdd: (input: ProductInput) => Promise<ProductResponse | undefined>;
  handleUpdate: (
    id: number,
    input: ProductInput
  ) => Promise<ProductResponse | undefined>;
  initialValues: ProductInput;
  isEdit: number;
};

const schema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
  sell_price: Yup.number().required("Required"),
});

const ProductForm = (props: Props) => {
  // const { data: categories } = useSWR("/api/categories?perPage=9999", (url) =>
  //   axios.get(url).then((res) => res.data)
  // );

  const [errorsResponse, setErrorsResponse] = useState([]);
  if (errorsResponse.length > 0)
    setTimeout(() => {
      setErrorsResponse([]);
    }, 10000);

  return (
    <Formik
      initialValues={props.initialValues}
      enableReinitialize={true}
      validationSchema={schema}
      onSubmit={async (values, {}) => {
        props.isEdit === 0
          ? props
              .handleAdd(values)
              .catch(
                (err: any) =>
                  err.response && setErrorsResponse(err.response.data.message)
              )
          : props
              .handleUpdate(props.isEdit, values)
              .catch(
                (err: any) =>
                  err.response && setErrorsResponse(err.response.data.message)
              );
      }}
    >
      {({ setFieldValue, values, errors, isSubmitting }) => (
        <Form className="flex flex-col justify-center items-stretch gap-4 ">
          <span className="text-red-500">{errorsResponse}</span>

          <Input
            defaultValue={props.initialValues.name}
            errors={errors.name}
            label="Product Name"
            name="name"
            placeholder="e.g Ketchup"
            type="text"
          />
          <Input
            defaultValue={props.initialValues.sell_price}
            errors={errors.sell_price}
            label="Product Sell Price"
            name="sell_price"
            placeholder="e.g 2000"
            type="number"
          />
          <Dropzone
            value={values.image}
            label={"Store Image"}
            name="image"
            errors={errors.image}
            setFieldValue={setFieldValue}
          />
          <SubmitButton
            disabled={isSubmitting}
            text={isSubmitting ? "Loading ..." : "Submit"}
          />
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;
