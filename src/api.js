import axios from "axios";

const api = axios.create({
  baseURL: "https://staging.fastor.ai",
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("fastor_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const registerMobile = (mobile) =>
  api.post("/v1/pwa/user/register", { mobile });

export const loginWithOtp = (mobile, otp) =>
  api.post("/v1/pwa/user/login", { mobile, otp });

export const fetchRestaurants = (city_id = 118) =>
  api.get(`/v1/m/restaurant?city_id=${city_id}`);

export default api;
