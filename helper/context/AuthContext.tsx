import { useRouter } from "next/router";
import { useState, createContext, useContext, useEffect } from "react";
import axios from "../lib/api";

import {
  destroyToken,
  getAccessToken,
  setAccessToken,
  setRefreshToken,
} from "@/helper/lib/token";
import { AuthUser } from "../type/Auth";

type ContextType = {
  user: any;
  login: ({}: any) => Promise<any>;
  logout: () => void;
  register: ({}: any) => Promise<any>;
  error: Object;
};

const defaultValue: ContextType = {
  user: {
    id: 0,
    roles: [],
    email: "",
    blocked: false,
    emailVerifiedAt: null,
    createdAt: "",
    updatedAt: "",
    allRoles: [],
    allPermissions: [],
  },
  login: async () => {},
  logout: () => {},
  register: async () => {},
  error: {},
};

export const AuthContext = createContext(defaultValue);

// export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [user, setUser] = useState(defaultValue.user);
  const [error, setError] = useState({});
  const baseURL = "http://localhost:8810";
  // const baseURL = "http://192.168.1.4:8810";
  const login = async (input: any) => {
    return await axios.post(`${baseURL}/api/login`, input).then((res) => {
      setUser(res.data.data.user),
        setAccessToken(res.data.data.accessToken),
        setRefreshToken(res.data.data.refreshToken);
      router.push("/dashboard");
    });
  };
  const logout = () => {
    setUser(defaultValue.user);
    destroyToken();
    router.push("/login");
  };
  const register = async (input: any) => {
    return await axios
      .post(`${baseURL}/api/register`, input)
      .then((res) => {
        setUser(res.data.data.user),
          setAccessToken(res.data.data.accessToken),
          setRefreshToken(res.data.data.refreshToken);
        router.push("/dashboard");
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    async function loadUser() {
      const token = getAccessToken();
      if (token) {
        await axios
          .get("/api/me")
          .then((res) => setUser(res.data.data))
          .catch((err) => err);
      }
    }
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register, error }}>
      {children}
    </AuthContext.Provider>
  );
};

// Wdfo9XXuzTP42yCU
