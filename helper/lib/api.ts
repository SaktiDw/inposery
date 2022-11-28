import axios from "axios";

export default axios.create({
  baseURL: process.env.API_URL,
  // baseURL: "http://127.0.0.1:8000",
  headers: {
    Accept: "application/json",
    // "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});
