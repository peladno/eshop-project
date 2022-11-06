const express = require("express");
const router = express.Router();
const order = require("../controllers/order.controller");
const { userAuth } = require("../utils/jwt");

//order process
router.post("/:id/shop",userAuth, order.orderProcess);

module.exports = router;
