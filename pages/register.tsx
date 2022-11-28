import { Input } from "@/components";
import useAuth from "@/helper/hooks/useAuth";
import { AuthInput } from "@/helper/type/Auth";
import { AxiosError } from "axios";
import { Form, Formik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import * as Yup from "yup";

type Props = {};

const Register = (props: Props) => {
  const { register } = useAuth();
  const [errorsResponse, setErrorsResponse] = useState<AxiosError<any>>();
  const authSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });
  return (
    <div className="w-full min-h-screen bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-white flex items-center justify-center">
      <Formik
        validateOnMount
        initialTouched={{
          name: true,
          email: true,
          password: true,
          password_confirmation: true,
        }}
        initialValues={{
          name: "",
          email: "",
          password: "",
          password_confirmation: "",
        }}
        validationSchema={authSchema}
        onSubmit={async (values: any, { setErrors }) => {
          const { name, email, password, password_confirmation } = values;
          register({ name, email, password, password_confirmation, setErrors });
        }}
      >
        {({ isValid, errors }) => (
          <Form className="flex flex-col gap-4 w-1/2">
            <div className="text-3xl">Register</div>
            {errors.message && (
              <span className="text-red-500">
                {JSON.stringify(errors.message)}
              </span>
            )}
            <Input
              errors={errors.name}
              label="Username"
              name="name"
              placeholder="e.g Example"
              type="text"
            />
            <Input
              errors={errors.email}
              label="E-mail"
              name="email"
              placeholder="e.g example@gmail.com"
              type="email"
            />
            <Input
              errors={errors.password}
              label="Password"
              name="password"
              placeholder="password"
              type="password"
            />
            <Input
              errors={errors.password_confirmation}
              label="Password Confirmation"
              name="password_confirmation"
              placeholder="password_confirmation"
              type="password"
            />

            <button
              type="submit"
              disabled={!isValid}
              className="w-full  text-white  bg-green-500 ring-2 ring-green-500 disabled:ring-green-800 disabled:bg-green-800 disabled:cursor-not-allowed disabled:shadow font-semibold shadow-xl py-2 px-4 rounded-lg "
            >
              Submit
            </button>
            <span className="text-slate-500">
              Already have an account?{" "}
              <Link
                href={"/login"}
                className="text-green-700 hover:text-green-500 font-semibold"
              >
                login here
              </Link>
            </span>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
