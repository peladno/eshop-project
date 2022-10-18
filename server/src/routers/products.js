const express = require("express");
const router = express.Router();
const product = require("../controllers/product.controller");
const { adminAuth } = require("../utils/jwt");

//get all products
router.get("/", product.getAll);

//get product by id
router.get("/:id", product.getByID);

//delete product by id
router.delete("/:id", adminAuth, product.deleteById);

//save product
router.post("/", adminAuth, product.save);

//update product
router.put("/:id", adminAuth, product.updateById);

module.exports = router;
