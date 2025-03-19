import axios from "axios";
import axiosRetry from "axios-retry";
import TokenService from "./Token/TokenService";

export const API_URL = import.meta.env.VITE_API_URL;

// Основной экземпляр axios для запросов
const $api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Отдельный экземпляр axios для обновления токена (без перехватчиков)
const $refreshApi = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Флаг для отслеживания процесса обновления токена
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

// Перехват запросов – подставляем токен
$api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Перехват ответов – обновляем токен
$api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== `${API_URL}/api/token/refresh/`
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // Если уже идет обновление токена, ставим запрос в очередь
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return $api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // Используем отдельный экземпляр axios для обновления
        const response = await $refreshApi.post("/api/token/refresh/", {
          refresh: refreshToken,
        });

        const newAccessToken = response.data.access;
        if (!newAccessToken) {
          throw new Error("No access token received from refresh");
        }

        localStorage.setItem("authToken", newAccessToken);

        // Разрешаем все запросы в очереди с новым токеном
        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return $api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        // Очищаем токены и отклоняем все запросы в очереди
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");

        processQueue(refreshError);

        // Редирект только если не на странице логина
        if (window.location.pathname !== "/") {
          window.location.href = "/";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Настройка axios-retry для ошибок 5xx
axiosRetry($api, {
  retries: 3,
  retryDelay: (retryCount) => retryCount * 1000,
  shouldResetTimeout: true,
  retryCondition: (error) => {
    return error.response?.status >= 500 && error.response?.status <= 599;
  },
});

export default $api;
/* вариант без автоматического обновления accessToken */
// import axios from 'axios'

// export const API_URL = import.meta.env.VITE_API_URL

// const $api = axios.create({
// 	baseURL: API_URL, // Base URL for all requests
// 	headers: {
// 		'Content-Type': 'application/json', // Set JSON as the content type
// 	},
// })

// // Add a request interceptor to attach the token dynamically
// $api.interceptors.request.use(
// 	config => {
// 		const token = localStorage.getItem('authToken') // Retrieve token from localStorage
// 		if (token) {
// 			config.headers.Authorization = `Bearer ${token}` // Attach token to Authorization header
// 		}
// 		return config
// 	},
// 	error => {
// 		return Promise.reject(error)
// 	}
// )

// export default $api
