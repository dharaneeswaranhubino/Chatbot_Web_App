import axios from "axios";
import type { Store } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { AxiosError, type InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    withCredentials: true, // Cookie auto-send
});
//inject pattern (circular dependency)
let storeRef: Store<RootState> | null = null;

export const injectStore = (_store: Store<RootState>) => {
    storeRef = _store;
};

//request interceptor
api.interceptors.request.use((config) => {
    const token = storeRef?.getState().auth.accessToken;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

//response interceptor
let isRefreshing = false;
let failedQueue: {
    resolve: (token: string) => void;
    reject: (reason: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token!);
        }
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,

    async (error: AxiosError) => {
        // store which request failed
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };

        // check if the refresh api itself then store it here
        const isRefreshRequest = originalRequest.url?.includes("/auth/refresh");
        if (isRefreshRequest) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry && !isRefreshRequest) {

            if (isRefreshing) {
                return new Promise<string>((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return api(originalRequest);
                    })
                    .catch((err: unknown) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const res = await api.post("/auth/refresh");
                const newAccessToken = res.data.data.accessToken as string;

                // Redux update — no localStorage!
                storeRef?.dispatch({
                    type: "auth/setAccessToken",
                    payload: newAccessToken,
                });

                processQueue(null, newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);

            } catch (refreshError: unknown) {
                processQueue(refreshError, null);
                storeRef?.dispatch({ type: "auth/logout" });
                window.location.href = "/login";
                return Promise.reject(refreshError);

            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);