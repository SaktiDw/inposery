import useSWR from "swr";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { AuthInput, AuthUser, RegisterInput } from "../type/Auth";
import { AxiosResponse } from "axios";

export default function useAuth({ middleware }: any = {}) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  const {
    data: user,
    error,
    mutate,
  } = useSWR("/api/user", (url) =>
    axios.get(url).then((response: AxiosResponse<AuthUser>) => response.data)
  );

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const login = async (setErrors: any, input: AuthInput) => {
    setErrors([]);

    await csrf();

    axios
      .post("/api/login", input)
      .then(() => {
        mutate();
        router.push("/dashboard");
      })

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

  useEffect(() => {
    if (user || error) {
      setIsLoading(false);
    }

    if (middleware == "guest" && user) router.push("/");
    if (middleware == "auth" && !user && error) router.push("/login");
  });

  return {
    user,
    csrf,
    login,
    register,
    logout,
    isLoading,
  };
}
