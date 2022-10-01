const express = require("express");
const router = express.Router();
const cart = require("../controllers/cart.controller")

//get all carts
router.get("/", cart.getAll);

//save empty cart
router.post("/:id", cart.saveCart);

//delete cart by id
router.delete("/:id/products", cart.deleteCartById);

//get cart by id
router.get("/:id/products", cart.getCartById);

//add product to cart
router.post("/:id/products", cart.addProductToCart);

//delete product by id from cart by id
router.delete("/:id/products/:id_prod", cart.deleteProductCart);

//order process
router.post("/:id/shop", cart.orderProcess);

module.exports = router;
