import axios, { AxiosError } from "axios";

export const axiosInstance = axios.create({
  headers: {
    "Access-Control-Allow-Methods": "*",
  },
});

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return(response)
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  });
