import { client, clientAdmin, user } from "./AxiosClient";

const getCurrentUser = () => {
    return user.get("/login/success");
  };

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
    return clientAdmin.post("/products/", data)
}

const services = {
  deleteProduct,
  updateProducts,
  getAllProducts,
  getProductId,
  getCurrentUser,
  saveProduct
};

export default services;
