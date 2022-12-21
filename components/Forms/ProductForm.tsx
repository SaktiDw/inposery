import { Formik, Form } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import {
  Dropzone,
  Input,
  ResetButton,
  Select,
  SubmitButton,
} from "@/components";
import { ProductInput, ProductResponse } from "@/helper/type/Product";
import { getFetcher } from "@/helper/lib/api";
import { Option } from "react-multi-select-component";
import useSWR from "swr";
import { Category } from "@/helper/type/Category";

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
  const [selected, setSelected] = useState<Option[]>(
    props.initialValues.category || []
  );

  const { data: categories } = useSWR("/api/categories", getFetcher);

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
      onSubmit={async (values, { setSubmitting }) => {
        values.category = selected;
        props.isEdit === 0
          ? await props
              .handleAdd(values)
              .catch(
                (err: any) =>
                  err.response && setErrorsResponse(err.response.data.message)
              )
          : await props
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
          <Select
            label="Category"
            placeholder="Select"
            options={
              categories
                ? categories.map((item: Category) => ({
                    label: item.name,
                    value: item.name,
                  }))
                : []
            }
            selected={selected}
            setSelected={setSelected}
            isCreateable={true}
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
          <ResetButton text={"Reset"} />
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;
