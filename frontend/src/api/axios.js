import axios from "axios";

const BACKEND_URL = "http://127.0.0.1:3000";

const normalAxios = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosWithHeader = axios.create({
  baseURL: BACKEND_URL,

  headers: {
    "Content-Type": "application/json",
  },
});

axiosWithHeader.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { normalAxios, axiosWithHeader };
