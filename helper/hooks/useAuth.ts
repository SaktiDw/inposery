import useSWR from "swr";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "../lib/axios";

export default function useAuth({ middleware }: any = {}) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  const {
    data: user,
    error,
    mutate,
  } = useSWR("/api/user", (url) =>
    axios.get(url).then((response: any) => response.data)
  );

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const login = async ({ setErrors, ...props }: any) => {
    setErrors([]);

    await csrf();

    axios
      .post("/api/login", props)
      .then(() => {
        mutate();
        router.push("/dashboard");
      })

      .catch((error: any) => {
        if (error.response.status != 422) throw error;

        setErrors({ message: error.response.data?.message });
      });
  };
  const register = async ({ setErrors, ...props }: any) => {
    setErrors([]);

    // await csrf();

    axios
      .post("/api/register", props)
      .then(() => mutate())
      .then(() => router.push("/"))
      .catch((error: any) => {
        if (error.response.status != 422) throw error;

        setErrors({ message: error.response.data?.message });
      });
  };

  const logout = async () => {
    await axios.post("/api/logout");

    mutate(null);

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
