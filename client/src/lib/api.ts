import axios, { AxiosError } from "axios";

import { useTokenStore } from "@/store/TokenStore";

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_BACKEND_URL });
api.interceptors.request.use(
  async (config) => {
    const accessToken = useTokenStore.getState().access;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken.encoded}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Queue of failed request promises waiting for refreshed token
let failedQueue: {
  resolve: () => void;
  reject: (_: AxiosError | null) => void;
}[] = [];
let isRefreshing = false;

const processQueue = (error: AxiosError | null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const tokenState = useTokenStore.getState();
    const originalRequest = error.config;

    const handleError = (error: AxiosError | null) => {
      processQueue(error);
      tokenState.clear();
      return Promise.reject(error);
    };

    const refreshTokenValid =
      tokenState.refresh != undefined && tokenState.refresh.expiry > Date.now();
    const isAuthError =
      error.response?.status === 401 || error.response?.status === 403;

    if (
      refreshTokenValid == true &&
      isAuthError &&
      originalRequest.url !== "/auth/refresh/" &&
      originalRequest._retry !== true
    ) {
      if (isRefreshing) {
        return new Promise<void>(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }
      isRefreshing = true;
      originalRequest._retry = true;
      return api
        .post("/auth/refresh/", {
          refresh: tokenState.refresh!.encoded,
        })
        .then((res) => {
          if (res.data.access) {
            tokenState.setAccess(res.data.access);
          }
          processQueue(null);

          return api(originalRequest);
        }, handleError)
        .finally(() => {
          isRefreshing = false;
        });
    }

    if (isAuthError) {
      return handleError(error);
    }

    return Promise.reject(error);
  },
);

export default api;
