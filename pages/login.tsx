import { Input } from "@/components";
import { useAuth } from "@/helper/context/AuthContext";
import { AuthInput } from "@/helper/type/Auth";
import { AxiosError } from "axios";
import { Form, Formik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import * as Yup from "yup";

type Props = {};

const Login = (props: Props) => {
  const { login } = useAuth();
  const [errorsResponse, setErrorsResponse] = useState<AxiosError<any>>();
  const authSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });
  return (
    <div className="w-full min-h-screen bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-white flex items-center justify-center">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={authSchema}
        onSubmit={async (values: AuthInput, { setErrors }) => {
          login(values).catch((res) => setErrorsResponse(res));
        }}
      >
        {({ isValid, errors }) => (
          <Form className="flex flex-col gap-4 w-1/2">
            <div className="text-3xl">Login</div>
            {errorsResponse && (
              <span className="text-red-500">
                {errorsResponse?.response?.data.message}
              </span>
            )}
            <Input
              id="email"
              errors={errors.email}
              label="E-mail"
              name="email"
              placeholder="e.g example@gmail.com"
              type="email"
            />
            <Input
              id="password"
              errors={errors.password}
              label="Password"
              name="password"
              placeholder="password"
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
              Dont have an account?{" "}
              <Link
                href={"/register"}
                className="text-green-700 hover:text-green-500 font-semibold"
              >
                register here
              </Link>
            </span>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
