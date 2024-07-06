import axios from "axios";
import Cookies from "js-cookie";

import { refreshAccessToken } from "@/hooks/useAuth";

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_BACKEND_URL });
api.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer ${Cookies.get("access")}`;
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const access_token = await refreshAccessToken();
      axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
      return api(originalRequest);
    }
    return Promise.reject(error);
  },
);

export default api;
