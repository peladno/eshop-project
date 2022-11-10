const express = require("express");
const router = express.Router();
const passport = require("../utils/passport");
const { login, userAuth } = require("../utils/jwt.js");
const user = require("../controllers/user.controller");
const validations = require("../utils/validator");

//Routes
router.post(
  "/login",
  validations.validate(validations.validationUserLogin),
  passport.authenticate("login"),
  login
);

router.post(
  "/signup",
  validations.validate(validations.validationUser),
  user.signUp
);

router.get("/logout", user.logOut);

router.get("/login/success", userAuth, user.loginSucess);

module.exports = router;
