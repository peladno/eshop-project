const express = require("express");
const router = express.Router();
const passport = require("../utils/passport");
const User = require("../../model/login.model");

//Routes

router.post("/login", passport.authenticate("login"), async (req, res) => {
  res.status(200).json({
    success: true,
    message: "success login",
    user: req.user
  });
});

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
});

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) next();
  else {
    res.status(200).json({
      success: true,
      message: "Failure",
    });
  }
}

router.get("/logout", (req, res) => {
  /*req.logout();
  res.redirect();*/
  if (req.user?.username) {
    req.session.destroy((err) => {
      throw new Error(err);
    });
  }
});

router.get("/login/success", checkAuthentication, (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "success user",
      user: req.user,
    });
    console.log(req.user);
  } else {
    req.status(404).json({
      success: false,
      message: "No user",
    })
  }
});

module.exports = router;
