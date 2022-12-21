import { Formik, Form } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { Dropzone, Input, ResetButton, SubmitButton } from "@/components";
import { StoreInput, StoresResponse } from "@/helper/type/Store";

type Props = {
  handleAdd: (input: StoreInput) => Promise<StoresResponse | undefined>;
  handleUpdate: (
    id: number,
    input: StoreInput
  ) => Promise<StoresResponse | undefined>;
  initialValues: StoreInput;
  isEdit: number;
};

const schema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
});

const StoreForm = (props: Props) => {
  const [errorsResponse, setErrorsResponse] = useState([]);

  return (
    <Formik
      initialValues={props.initialValues}
      enableReinitialize={true}
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => {
        props.isEdit <= 0
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
      {({ errors, setFieldValue, values, isSubmitting }) => (
        <Form className="flex flex-col justify-center items-stretch gap-4 ">
          <span className="text-red-500">{errorsResponse}</span>

          <Input
            errors={errors.name}
            label="Store Name"
            name="name"
            type="text"
            placeholder="e.g Toko Bangunan"
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

export default StoreForm;
