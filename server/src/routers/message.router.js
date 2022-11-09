const express = require("express");
const router = express.Router();
const messages = require("../controllers/messages.controller");

//send messages
router.post("/addMessages", messages.addMessage);

//get all messages
router.get("/getMesssages", messages.getAllMessages)

module.exports = router;
