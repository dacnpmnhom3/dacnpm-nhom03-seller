import axiosClient from "./axiosClient";

const productApi = {
  getAll: (params) => {
    const url = "api/product";
    return axiosClient.get(url, { params });
  },
  get: (id) => {
    const url = `api/product/${id}`;
    return axiosClient.get(url);
  },
  getVariation: (id) => {
    const url = `api/product/recent-variations/${id}`;
    return axiosClient.get(url);
  },
  recommend: (key) => {
    const url = `api/product/recommend/${key}`;
    return axiosClient.get(url);
  },
  search: (key) => {
    const url = `api/product/search/${key}`;
    return axiosClient.get(url);
  },
  update: (id, body) => {
    const url = `api/product/${id}`;
    return axiosClient.put(url, body);
  },
  create: (body) => {
    const url = "api/product";
    return axiosClient.post(url, body);
  },
};

export default productApi;
