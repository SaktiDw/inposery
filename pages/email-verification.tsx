import useAuth from "@/helper/hooks/useAuth";
import axios from "@/helper/lib/axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Swal from "sweetalert2";

type Props = {};

const EmailVerification = (props: Props) => {
  const router = useRouter();
  const { user, logout } = useAuth({ middleware: "auth" });

  if (user && user?.email_verified_at !== null) router.replace("/dashboard");

  return (
    <div className="flex flex-col items-center justify-center px-4 bg-slate-100 dark:bg-slate-900 dark:text-white h-screen">
      <div className="max-w-[600px] h-min flex flex-col gap-4 bg-slate-100 shadow-lg text-slate-700 dark:bg-slate-800 dark:text-white p-4 px-8 rounded-xl sm:text-lg">
        <span className="">
          Thanks for signing up! Before getting started, could you verify your
          email address by clicking on the link we just emailed to you? If you
          didn&rsquo;t receive the email, we will gladly send you another.
        </span>
        <button
          className="text-white bg-gradient-to-tl froym-green-700 to-lime-500 disabled:from-green-800 disabled:to-green-800 disabled:cursor-not-allowed font-semibold shadow-lg py-2 px-4 rounded-lg "
          onClick={() =>
            axios
              .post("/api/resend-email-verification-link")
              .then((res) => Swal.fire("Success", res.data.message, "success"))
          }
        >
          Resend email verifycation link
        </button>
        <button
          className="text-slate-500 hover:text-slate-800 dark:hover:text-white font-semibold"
          onClick={() => logout().then((res) => router.push("/login"))}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default EmailVerification;
