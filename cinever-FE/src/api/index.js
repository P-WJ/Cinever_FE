import axios from "axios";
import { useUserStore } from "../stores/userStore";
import { mockAdapter } from "./mockAdapter";

const useMockApi = import.meta.env.VITE_USE_MOCK_API !== "false";

const api = axios.create({
  baseURL: "http://localhost:8080",
  adapter: useMockApi ? mockAdapter : undefined,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    const token = userStore.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
