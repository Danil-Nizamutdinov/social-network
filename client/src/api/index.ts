import axios from "axios";

const API_URL = "http://localhost:5000/api/";
export const apiUrlStatic = "http://localhost:5000/static/";

export const apiWithCheckAuth = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

export const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

apiWithCheckAuth.interceptors.request.use((config) => {
  const newConfig = { ...config };
  newConfig.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return newConfig;
});
