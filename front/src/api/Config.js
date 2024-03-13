import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

API.interceptors.request.use((config) => ({
  ...config,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
}));

export default API;
