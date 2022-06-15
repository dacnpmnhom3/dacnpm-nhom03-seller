import axiosClient from "./axiosClient";

const sellerApi = {
  get: (id) => {
    const url = `api/seller/${id}`;
    return axiosClient.get(url);
  },
  register: (body) => {
    const url = "api/seller/register";
    return axiosClient.post(url, body);
  },
  login: (body) => {
    const url = "api/seller/login";
    return axiosClient.post(url, body);
  },
  update: (id) => {
    const url = `api/seller/${id}`;
    return axiosClient.put(url);
  },
};

export default sellerApi;
