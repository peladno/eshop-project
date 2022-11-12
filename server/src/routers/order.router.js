const express = require("express");
const router = express.Router();
const order = require("../controllers/order.controller");
const { userAuth, adminAuth } = require("../utils/jwt");

//order process
router.post("/:id/shop", userAuth, order.orderProcess);
router.get("/:id/allOrders", userAuth, order.allOrders);

module.exports = router;
