import axios from "axios";
import Cookies from "js-cookie";

import { refreshAccessToken } from "@/hooks/useAuth";

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_BACKEND_URL });
api.interceptors.request.use(async (config) => {
  const accessTok = Cookies.get("access");
  if (accessTok) {
    config.headers.Authorization = `Bearer ${accessTok}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (
      (error.response.status === 403 ||
        (error.response.status === 401 && Cookies.get("refresh"))) &&
      !originalRequest._retry &&
      !Cookies.get("access")
    ) {
      console.log("error happened");
      originalRequest._retry = true;
      const accessTok = await refreshAccessToken();
      axios.defaults.headers.common.Authorization = `Bearer ${accessTok}`;
      return api(originalRequest);
    }
    return Promise.reject(error);
  },
);

export default api;
