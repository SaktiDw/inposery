import { Input, SubmitButton } from "@/components";
import useAuth from "@/helper/hooks/useAuth";
import axios from "axios";
import { Form, Formik, FormikValues } from "formik";
import { values } from "lodash";
import { useRouter } from "next/router";
import React from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";

type Props = {};

const PasswordReset = (props: Props) => {
  useAuth({ middleware: "guest" });
  const router = useRouter();
  const { token, email } = router.query;
  const resetPasswordSchema = Yup.object().shape({
    token: Yup.string().required("Required"),
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
    <div className="flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900 dark:text-white h-screen">
      <Formik
        enableReinitialize={true}
        initialValues={{
          token: token,
          email: email,
          password: "",
          password_confirmation: "",
        }}
        validationSchema={resetPasswordSchema}
        onSubmit={async (values: FormikValues, { setErrors }) => {
          await axios
            .post(`${process.env.API_URL}/api/reset-password`, values)
            .then((res) => {
              Swal.fire("Success", res.data.message, "success");
              router.push("/login");
            })
            .catch((err) =>
              Swal.fire("Error", err.response.data.message, "error")
            );
        }}
      >
        {({ values, isSubmitting, errors }) => (
          <Form className="flex flex-col gap-4 w-1/2">
            <div className="text-3xl">Create New Password</div>
            {errors.message && (
              <span className="text-red-500">
                {JSON.stringify(errors.message)}
              </span>
            )}
            <Input
              errors={errors.password}
              label="New Password"
              name="password"
              placeholder="*******"
              type="password"
            />
            <Input
              errors={errors.password_confirmation}
              label="New Password Confirmation"
              name="password_confirmation"
              placeholder="*******"
              type="password"
            />

            <SubmitButton
              disabled={isSubmitting}
              text={`${isSubmitting ? "Loading..." : "Reset password"}`}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PasswordReset;
