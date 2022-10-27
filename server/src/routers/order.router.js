const express = require("express");
const router = express.Router();
const order = require("../controllers/order.controller");

//order process
router.post("/:id/shop", order.orderProcess);

module.exports = router;
