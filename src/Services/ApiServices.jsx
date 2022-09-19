import { client, clientAdmin, user } from "./AxiosClient";

const getCurrentUser = () => {
  return user.get("/login/success");
};

const userLogout = () => {
  return user.post("/logout/");
};

const loginUser = (data) => {
  return user.post("/login/", data);
}

const getAllProducts = () => {
  return client.get("/products/");
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

const addToCart = (id,data) => {
  return client.post(`/cart/${id}/products/`, data)
}

const services = {
  deleteProduct,
  updateProducts,
  getAllProducts,
  getProductId,
  getCurrentUser,
  saveProduct,
  userLogout,
  loginUser,
  addToCart
};

export default services;
