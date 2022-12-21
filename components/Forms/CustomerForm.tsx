import { Customer } from "@/helper/type/Cashier";
import { Form, Formik } from "formik";
import React from "react";
import SubmitButton from "../Buttons/SubmitButton";
import Input from "../Inputs/Input";
import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(10, "Too Long!")
    .required("Required"),
});

type Props = {
  handleAddCustomer: (values: Customer) => Promise<void>;
};

const CustomerForm = (props: Props) => {
  return (
    <>
      <Formik
        initialValues={{ name: "", active: true }}
        validateOnMount={true}
        validationSchema={schema}
        onSubmit={async (values, { resetForm, setFieldError }) => {
          await props
            .handleAddCustomer(values)
            .then(() => resetForm())
            .catch((err) => setFieldError("name", "Customer already exist!"));
          // localforage
          //   .getItem<Customer[]>("customer")
          //   .then((res: Customer[] | null) => {
          //     if (res !== null) {
          //       res.map((val: any) => (val.active = false));
          //       localforage
          //         .setItem("customer", [...res, values])
          //         .then((res) => setCustomer(res));
          //     } else {
          //       localforage
          //         .setItem("customer", [values])
          //         .then((res) => setCustomer(res));
          //     }
          //   });
        }}
      >
        {({ isValid, errors }) => (
          <Form className="flex flex-col justify-center items-stretch gap-4 ">
            <Input
              label={"Customer"}
              name="name"
              type={"text"}
              placeholder={"e.g Bambang"}
              errors={errors.name}
            />
            <SubmitButton text={`Submit`} disabled={!isValid} />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CustomerForm;
