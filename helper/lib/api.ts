// import { error } from "console";
// import { getAccessToken } from "./token";

// let url = "http://localhost:8810/graphql";
// export const api = async (query: string, variables?: any) => {
//   await fetch(url, {
//     method: "POST",
//     headers: {
//       "content-type": "application/json; charset=utf-8",
//       Authorization: `Bearer ${getAccessToken()}`,
//     },
//     body: JSON.stringify({
//       query,
//       variables,
//     }),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       if (data.errors) {
//         const error = new Error("An error occurred while fetching the data.");
//         // Attach extra info to the error object.
//         error.message = data.error.message;
//         throw error;
//       }
//       return data;
//     });
// };

import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import {
  destroyToken,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "./token";

const baseURL = "http://127.0.0.1:8810";

let access_token = getAccessToken() ? getAccessToken() : "";
let refresh_token = getAccessToken() ? getAccessToken() : "";

const api = axios.create({
  baseURL,
  // headers: { Authorization: `Bearer ${getAccessToken()}` },
});

// api.interceptors.request.use(
//   async (req) => {
//     access_token = getAccessToken() ? getAccessToken() : "";
//     req.headers = { Authorization: `Bearer ${getAccessToken()}` };

//     const user = jwt_decode(access_token || "");
//     const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

//     if (!isExpired) return req;

//     const response = await axios.post(`${baseURL}/api/refresh-token`, {
//       refreshToken: getRefreshToken(),
//     });
//     if (response.status === 401) {
//       Promise.reject();
//     }
//     destroyToken();
//     setAccessToken(response.data.data.accessToken);
//     setRefreshToken(response.data.data.refreshToken);
//     req.headers = { Authorization: `Bearer ${response.data.accessToken}` };
//     return req;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async function (error) {
//     const originalRequest = error.config;
//     // if (error.response.status === 401) {
//     //   if (typeof window === "undefined") {
//     //     throw new Error(); //Throw custom error here
//     //   } else {
//     //     window.location.href = "/login";
//     //   }
//     //   destroyToken();
//     //   return Promise.reject(error);
//     // }
//     if (
//       error.response.status === 401 &&
//       originalRequest.url === `/api/refresh-token`
//     ) {
//       if (typeof window === "undefined") {
//         throw new Error(); //Throw custom error here
//       } else {
//         window.location.href = "/login";
//       }
//       return Promise.reject(error.response);
//     }
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refresh_token = getRefreshToken();
//       return await axios
//         .post(`${baseURL}/api/refresh-token`, {
//           refreshToken: refresh_token,
//         })
//         .then((res) => {
//           setAccessToken(res.data.data.accessToken);
//           setRefreshToken(res.data.data.refreshToken);
//         })
//         .finally(() =>
//           axios(originalRequest, {
//             headers: {
//               Authorization: `Bearer ${getRefreshToken()}`,
//             },
//           })
//         );
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
// import { rejects } from "assert";
// import Axios from "axios";
// import dayjs from "dayjs";
// import jwt_decode from "jwt-decode";
// import { redirect } from "next/navigation";

// import {
//   destroyToken,
//   getAccessToken,
//   getRefreshToken,
//   setAccessToken,
//   setRefreshToken,
// } from "./token";

// const baseURL = "http://localhost:8810";

// const access_token = getAccessToken() || "";
// const refresh_token = getRefreshToken() || "";

// const api = Axios.create({
//   baseURL,
//   headers: {
//     "X-Requested-With": "XMLHttpRequest",
//     "Content-Type": "application/json",
//     Accept: "application/json",
//     "Access-Control-Allow-Origin": "*",
//   },
// });

// api.interceptors.request.use(
//   async (config) => {
//     const access_token = getAccessToken() || "";
//     config.headers = {
//       Authorization: `Bearer ${access_token}`,
//     };
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async function (error) {
//     const originalRequest = error.config;
// if (error.response.status === 401) {
// if (typeof window === "undefined") {
//   throw new Error(); //Throw custom error here
// } else {
//   window.location.href = "/login";
// }
// destroyToken();
//   return Promise.reject(error);
// }
// if (
//   error.response.status === 401 &&
//   originalRequest.url === `/api/refresh-token`
// ) {
// if (typeof window === "undefined") {
//   throw new Error(); //Throw custom error here
// } else {
//   window.location.href = "/login";
// }
//       return Promise.reject(error.response);
//     }
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refresh_token = getRefreshToken();
//       return await Axios.post(`${baseURL}/api/refresh-token`, {
//         refreshToken: refresh_token,
//       })
//         .then((res) => {
//           setAccessToken(res.data.data.accessToken);
//           setRefreshToken(res.data.data.refreshToken);
//         })
//         .finally(() =>
//           api(originalRequest, {
//             headers: {
//               Authorization: `Bearer ${getRefreshToken()}`,
//             },
//           })
//         );
//     }
//     return Promise.reject(error);
//   }
// );

// axios.interceptors.response.use((response) => {
//   return response
// }, function (error) {
//   const originalRequest = error.config;

//   if (error.response.status === 401 && originalRequest.url ===
// 'http://13.232.130.60:8081/v1/auth/token) {
//       router.push('/login');
//       return Promise.reject(error);
//   }

//   if (error.response.status === 401 && !originalRequest._retry) {

//       originalRequest._retry = true;
//       const refreshToken = localStorageService.getRefreshToken();
//       return axios.post('/auth/token',
//           {
//               "refresh_token": refreshToken
//           })
//           .then(res => {
//               if (res.status === 201) {
//                   localStorageService.setToken(res.data);
//                   axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();
//                   return axios(originalRequest);
//               }
//           })
//   }
//   return Promise.reject(error);
// });
export default api;
