import axios from "axios";

const BASE_URL = "http://localhost:3000/api/";

const apiUser = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiUser.interceptors.request.use(
  (config) => {
    const userData = localStorage.getItem("userInfo");
    if (userData) {
      const user = JSON.parse(userData);
      const token = user.data?.authToken;
      if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiUser;
