const express = require("express");
const router = express.Router();
const cart = require("../controllers/cart.controller");
const { userAuth } = require("../utils/jwt");

//get all carts
router.get("/", userAuth, cart.getAll);

//save empty cart
router.post("/:id", userAuth, cart.saveCart);

//delete cart by id
router.delete("/:id/products", userAuth, cart.deleteCartById);

//get cart by id
router.get("/:id/products", userAuth, cart.getCartById);

//add product to cart
router.post("/:id/products", userAuth, cart.addProductToCart);

//delete product by id from cart by id
router.delete("/:id/products/:id_product", userAuth, cart.deleteProductCart);

module.exports = router;
