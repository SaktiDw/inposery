import { Formik, Form } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { Dropzone, Input } from "@/components";

type Props = {
  handleAdd: any;
  handleUpdate: any;
  initialValues: any;
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
      onSubmit={async (values, {}) => {
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
      {({ errors, isValid, setFieldValue, values }) => (
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

export default StoreForm;