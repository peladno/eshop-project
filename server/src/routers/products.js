const express = require("express");
const router = express.Router();
const product = require("../controllers/product.controller");
const { isAdmin } = require("../utils/middlewares");

//get all products
router.get("/", product.getAll);

//get product by id
router.get("/:id", product.getByID);

//delete product by id
router.delete("/:id", isAdmin, product.deleteById);

//save product
router.post("/", isAdmin, product.save);

//update product
router.put("/:id", isAdmin, product.updateById);

module.exports = router;
