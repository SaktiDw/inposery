import useAuth from "@/helper/hooks/useAuth";
import axios from "@/helper/lib/axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

type Props = {};

const EmailVerification = (props: Props) => {
  const router = useRouter();
  const { user } = useAuth({ middleware: "auth" });

  if (user && user?.email_verified_at !== null) router.replace("/dashboard");

  return (
    <div className="flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900 dark:text-white h-screen">
      <div className="w-[300px] flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900 dark:text-white h-screen">
        <button
          onClick={() =>
            axios
              .post("/api/resend-email-verification-link")
              .then((res) => res.data)
          }
        >
          Resend email verifycation link
        </button>
      </div>
    </div>
  );
};

export default EmailVerification;
