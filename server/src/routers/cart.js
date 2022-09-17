const express = require("express");
const router = express.Router();
const DAO = require("../../model/cart.model");

//get all carts
router.get("/", async (request, resolve) => {
  try {
    const data = await DAO.getAll();
    resolve.send(data);
  } catch (error) {
    throw new Error(error);
  }
});

//save empty cart
router.post("/:id", async (request, resolve) => {
  try {
    const id = request.params.id;
    const cart = {
      products: [],
    };
    const saved = await DAO.createCart(id, cart);

    resolve.send(saved);
  } catch (error) {
    throw new Error(error);
  }
});

//delete cart by id
router.delete("/:id/products", async (request, resolve) => {
  const id = request.params.id;

  try {
    const deleted = await DAO.deleteById(id);
    resolve.send(deleted);
  } catch (error) {
    throw new Error(error);
  }
});

//get cart by id
router.get("/:id/products", async (request, resolve) => {
  const id = request.params.id;

  try {
    const data = await DAO.getIdByCart(id);
    if (!data) {
      resolve.send({ error: "cart not found" });
    } else {
      resolve.send(data);
    }
  } catch (error) {
    throw new Error(error);
  }
});

//add product to cart
router.post("/:id/products", async (request, resolve) => {
  const id = request.params.id;
  const newData = request.body;

  try {
    const data = await DAO.editCart(newData, id);
    resolve.send(data);
  } catch (error) {
    throw new Error(error);
  }
});

//delete product by id from cart by id
router.delete("/:id/products/:id_prod", async (request, resolve) => {
  const { id, id_prod } = request.params;
  const cartID = id;
  const prodID = id_prod;

  try {
    const deleteProduct = await DAO.deleteProduct(cartID, prodID);

    resolve.send({ message: "Product deleted", deleteProduct });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;
