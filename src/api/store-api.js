import axios from "axios";

const storeApi = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

storeApi.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization = token;
    return config;
  },
  function (err) {
    return err;
  }
);

export default storeApi;
