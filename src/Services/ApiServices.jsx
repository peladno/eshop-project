import { client, clientAdmin, user } from "./AxiosClient";

const getCurrentUser = () => {
  return user.get("/login/success");
};

const userLogout = () => {
  return user.get("/logout/");
};

const loginUser = (data) => {
  return user.post("/login/", data);
};

const getAllProducts = (keyword) => {
  return client.get(`/products?keyword=${keyword}`);
};

const getProductId = (id) => {
  return client.get(`/products/${id}`);
};

const updateProducts = (id, data) => {
  return clientAdmin.put(`/products/${id}`, data);
};

const deleteProduct = (id) => {
  return clientAdmin.delete(`/products/${id}`);
};

const saveProduct = (data) => {
  return clientAdmin.post("/products/", data);
};

const addToCart = (id, data) => {
  return client.post(`/cart/${id}/products/`, data);
};

const getCart = (id) => {
  return client.get(`/cart/${id}/products/`);
};

const deleteCart = (id) => {
  return client.delete(`/cart/${id}/products`);
};

const deleteProductFromCart = (id, id_product) => {
  return client.delete(`/cart/${id}/products/${id_product}`);
};

const buyProduct = (id) => {
  return client.post(`/orders/${id}/shop`);
};

const services = {
  deleteProduct,
  updateProducts,
  getAllProducts,
  getProductId,
  getCurrentUser,
  saveProduct,
  userLogout,
  loginUser,
  addToCart,
  getCart,
  deleteCart,
  deleteProductFromCart,
  buyProduct,
};

export default services;
