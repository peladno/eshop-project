const express = require("express");
const router = express.Router();
const product = require("../controllers/product.controller");
const { adminAuth } = require("../utils/jwt");
const validations = require("../utils/validator");

//get all products
router.get("/", product.getAll);

//get product by id
router.get("/:id", product.getByID);

//delete product by id
router.delete("/:id", adminAuth, product.deleteById);

//save product
router.post(
  "/",
  adminAuth,
  validations.validate(validations.validationProduct),
  product.save
);

//update product
router.put(
  "/:id",
  adminAuth,
  validations.validate(validations.validationProduct),
  product.updateById
);

module.exports = router;
