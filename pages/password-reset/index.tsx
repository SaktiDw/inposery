import { Input, SubmitButton } from "@/components";
import useAuth from "@/helper/hooks/useAuth";
import axios from "axios";
import { Form, Formik, FormikValues } from "formik";
import Link from "next/link";
import React from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";

type Props = {};

const ResetPassword = (props: Props) => {
  useAuth({ middleware: "guest" });
  const emailSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  });
  return (
    <div className="w-full min-h-screen bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-white flex items-center justify-center">
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={emailSchema}
        onSubmit={async (values: FormikValues, { setErrors }) => {
          await axios
            .post(`${process.env.API_URL}/api/forgot-password`, values)
            .then((res) => {
              Swal.fire("Success", res.data.message, "success");
            })
            .catch((err) =>
              Swal.fire("Error", err.response.data.message, "error")
            );
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form className="flex flex-col gap-4 w-1/2">
            <div className="text-3xl">Reset Password</div>
            {errors.message && (
              <span className="text-red-500">
                {JSON.stringify(errors.message)}
              </span>
            )}

            <Input
              errors={errors.email}
              label="E-mail"
              name="email"
              placeholder="e.g example@gmail.com"
              type="email"
            />

            <SubmitButton
              disabled={isSubmitting}
              text={`${
                isSubmitting ? "Loading..." : "Send Reset Password Link"
              }`}
            />
            <span className="text-slate-500">
              Already remember your password?{" "}
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

export default ResetPassword;
