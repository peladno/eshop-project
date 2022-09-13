const express = require("express");
const router = express.Router();
const passport = require("../utils/passport");
const User = require("../../model/login.model");
const { login, verifyToken } = require("../utils/jwt.js");
const messages = require("../utils/messages")

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
    throw new Error(err);
  }

  const subject = 'New User'
        const message = `<h2>Ecommerce mail:</h2>
        <ul>
            <li>Nombre: ${name}</li>
            <li>Email: ${email}</li>
            <li>Dirección: ${address}</li>
            <li>Teléfono Celular: ${phone}</li>
            <li>Foto url: ${phone}</li>
        </ul>
        <p>Thank you for register</p>
        `
        messages.gmail(subject, message)
});

router.get("/logout", (req, res) => {
  /*req.logout();
  res.redirect();*/
  if (req.user?.username) {
    req.session.destroy((err) => {
      throw new Error(err);
    });
  }
});

router.get("/login/success", verifyToken, (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "success user",
      user: req.user,
    });
    console.log(req.user);
  }
});

module.exports = router;
