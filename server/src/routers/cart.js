const express = require("express");
const router = express.Router();
const DAO = require("../../model/cart.model");
const USERDAO = require("../../model/login.model");
const logger = require("../logger/logger");
const messages = require("../utils/messages");

//get all carts
router.get("/", async (request, resolve) => {
  try {
    const data = await DAO.getAll();
    if (!data) {
      throw new Error("Carts not found");
    } else {
      resolve.send(data);
    }
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
  try {
    const id = request.params.id;
    const deleted = await DAO.deleteCart(id);
    resolve.send(deleted);
  } catch (error) {
    throw new Error(error);
  }
});

//get cart by id
router.get("/:id/products", async (request, resolve) => {
  try {
    const id = request.params.id;
    const search = await DAO.getCartById(id);
    resolve.send(search);
  } catch (error) {
    throw new Error(error);
  }
});

//add product to cart
router.post("/:id/products", async (request, resolve) => {
  try {
    const id = request.params.id;
    const newData = request.body;
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

//order process
router.post("/:id/shop", async (request, resolve) => {
  try {
    const client = request.params.id;
    const search = await DAO.getByID(client);
    const { name, email, phone } = await USERDAO.getById(client);
    const subject = "Your order...";
    const messageOrder = `${name} Your order is in process`;
    messages.sms(messageOrder, phone);
    messages.whatsapp(messageOrder, phone);
    messages.gmail(subject, messageOrder, email);
    await DAO.deleteByCart(client).then((resolve) => {
      resolve.json(`Carrito ${client}: Se borró con éxito.`);
    });
    resolve.send({ message: "Product in process", search });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;
