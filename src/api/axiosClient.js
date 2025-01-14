import axios from "axios";
import { store } from "../redux/store";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_PRODUCT_SERVER_URL,
});

axiosClient.interceptors.request.use(
  (config) => {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${store.getState().user.token}`;
    return config;
  },
  (error) => {
    throw error;
  },
);

axiosClient.interceptors.response.use(
  (res) => res,
  (error) => {
    const { status } = error.response;
    if (status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
