import axios from "axios";

export default axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});
