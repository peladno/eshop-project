const express = require("express");
const router = express.Router();
const passport = require("../utils/passport");
const User = require("../../model/login.model");
const { login, verifyToken } = require("../utils/jwt.js");
const messages = require("../utils/messages");
const logger = require("../logger/logger");

//Routes

router.post("/login", passport.authenticate("login"), login);

router.post("/signup", async (req, res) => {
  const { username, email, name, address, phone, photo, password } = req.body;
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      res.send({ message: "User already exists" });
    } else {
      const newUser = {
        username,
        email,
        name,
        address,
        phone,
        photo,
        password,
      };
      await User.create(newUser);
      res.status(200).json({
        success: true,
        message: "success",
        user: req.user,
      });
    }
  } catch (err) {
    logger.err(`Error signing up ${err}`);
    throw new Error(`Error signing up ${err}`);
  }

  const subject = "New User";
  const message = `<h2>Ecommerce mail:</h2>
        <ul>
            <li>Nombre: ${name}</li>
            <li>Email: ${email}</li>
            <li>Dirección: ${address}</li>
            <li>Teléfono Celular: ${phone}</li>
            <li>Foto url: ${phone}</li>
        </ul>
        <p>Thank you for register</p>
        `;
  messages.gmail(subject, message);
});

router.post("/logout", (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.send("logout succesfull")
  });
});

router.get("/login/success", verifyToken, (req, res) => {
  if (req.user) {
    res.status(200).json({
      auth: true,
      message: "success user",
      user: req.user,
    });
    console.log(req.user);
  } else {
    res.status(401).json({
      auth: false,
      message: "Enauthorized",
      user: req.user,
    });
  }
});

module.exports = router;
