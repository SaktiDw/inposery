import axios from "axios";
import {
  destroyToken,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "./token";

const baseURL = "http://localhost:8810";
// const baseURL = "http://192.168.1.4:8810";

axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

let access_token = getAccessToken();
let refreshingToken: any = null;

axios.interceptors.request.use((config) => {
  config.headers = {
    Authorization: `Bearer ${getAccessToken()}`,
  };
  return config;
});

function refreshToken() {
  return axios.post(`${baseURL}/api/refresh-token`, {
    refreshToken: getRefreshToken(),
  });
}

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const config = error.config;
    if (error.response && error.response.status === 401 && !config._retry) {
      config._retry = true;
      try {
        refreshingToken = refreshingToken ? refreshingToken : refreshToken();
        let res = await refreshingToken;
        destroyToken();
        setAccessToken(res.data.data.accessToken);
        setRefreshToken(res.data.data.refreshToken);
        refreshingToken = null;
        if (res.data.data.accessToken) {
          access_token = res.data.data.accessToken;
        }
        return axios(config);
      } catch (error) {
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
