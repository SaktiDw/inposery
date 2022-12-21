import useSWR, { SWRResponse } from "swr";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { AuthInput, AuthUser, RegisterInput } from "../type/Auth";
import { AxiosResponse } from "axios";
import { getFetcher } from "../lib/api";

export default function useAuth({ middleware }: any = {}) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  const {
    data: user,
    error,
    mutate,
  }: SWRResponse<AuthUser> = useSWR("/api/user", getFetcher);

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const login = async (setErrors: any, input: AuthInput) => {
    setErrors([]);

    await csrf();

    axios
      .post("/api/login", input)
      .then(() => mutate())
      // .then(() => router.push("/dashboard"))

      .catch((error: any) => {
        if (error.response.status != 422) throw error;

        setErrors({ message: error.response.data?.message });
      });
  };
  const register = async (setErrors: any, input: RegisterInput) => {
    setErrors([]);

    await csrf();

    axios
      .post("/api/register", input)
      .then(() => mutate())
      .then(() => router.push("/"))
      .catch((error: any) => {
        if (error.response.status != 422) throw error;

        setErrors({ message: error.response.data?.message });
      });
  };

  const logout = async () => {
    await axios.post("/api/logout");

    mutate(undefined);

    router.push("/login");
  };

  const forgotPassword = async ({ setErrors, setStatus, email }: any) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post("/forgot-password", { email })
      .then((response) => setStatus(response.data.status))
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const resetPassword = async ({ setErrors, setStatus, ...props }: any) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post("/reset-password", { token: router.query.token, ...props })
      .then((response) =>
        router.push("/login?reset=" + btoa(response.data.status))
      )
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const resendEmailVerification = ({ setStatus }: any) => {
    axios
      .post("/email/verification-notification")
      .then((response) => setStatus(response.data.status));
  };

  useEffect(() => {
    if (user || error) {
      setIsLoading(false);
    }

    if (middleware == "guest" && user) router.replace("/dashboard");
    if (middleware == "auth" && !user && error) router.replace("/login");
    if (user && user.email_verified_at == null)
      router.replace("/email-verification");
  }, [user, error]);

  return {
    user,
    csrf,
    login,
    register,
    logout,
    isLoading,
  };
}
