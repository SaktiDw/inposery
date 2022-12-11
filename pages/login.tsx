import { Input } from "@/components";
import SubmitButton from "@/components/Buttons/SubmitButton";
import useAuth from "@/helper/hooks/useAuth";
import { AuthInput } from "@/helper/type/Auth";
import { AxiosError } from "axios";
import { Form, Formik, FormikValues } from "formik";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import * as Yup from "yup";

type Props = {};

const Login = (props: Props) => {
  const { login, isLoading, user } = useAuth({ middleware: "guest" });
  const authSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Too Short! Min 8 Character!")
      .max(50, "Too Long!")
      .required("Required"),
  });
  return (
    <div className="w-full min-h-screen bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-white flex items-center justify-center">
      <Formik
        validateOnMount
        initialTouched={{ email: true, password: true }}
        initialValues={{ email: "", password: "" }}
        validationSchema={authSchema}
        onSubmit={async (values: FormikValues, { setErrors }) => {
          const { email, password } = values;
          await login(setErrors, { email, password });
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form className="flex flex-col gap-4 w-1/2">
            <div className="text-3xl">Login</div>
            {errors.message && (
              <span className="text-red-500">
                {JSON.stringify(errors.message)}
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

            <SubmitButton
              disabled={isSubmitting}
              text={`${isSubmitting ? "Loading..." : "Login"}`}
            />
            <span className="text-slate-500">
              Dont have an account?{" "}
              <Link
                href={"/register"}
                className="text-green-600 hover:text-green-500 font-semibold"
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
