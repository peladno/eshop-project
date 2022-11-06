const express = require("express");
const router = express.Router();
const passport = require("../utils/passport");
const { login, userAuth } = require("../utils/jwt.js");
const messages = require("../utils/messages");
const logger = require("../logger/logger");
const factoryUser = require("../DAOs/factoryDAO/UserDAOfactory.class");
const DAO = factoryUser.get();

//Routes
router.get("/", (req, res) => {
  res.send({ message: "ok" });
});

router.post("/login", passport.authenticate("login"), login);

router.post("/signup", async (req, res) => {
  const { username, email, name, address, phone, photo, password } = req.body;
  try {
    const user = await DAO.getUser(username);
    if (user) {
      res.status(409).json({
        success: false,
        message: "User already exist",
      });
      logger.info("User already exist");
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
      await DAO.saveUser(newUser).then(() => {
        messages.newUserEmail(name, email);
      });
      res.status(200).json({
        success: true,
        message: "success",
        user: req.user,
      });
    }
  } catch (err) {
    logger.error(`Error signing up ${err}`);
  }
});

router.get("/logout", async (req, res, next) => {
  try {
    req.logOut(function (err) {
      if (err) {
        return next(err);
      }
      req.session.destroy(function (error) {
        if (error) {
          return next(error);
        }
        res.clearCookie("connect.sid").send("Logout successfully");
      });
    });
  } catch (error) {
    logger.error(error);
  }
});

router.get("/login/success", userAuth, (req, res) => {
  if (req.user) {
    res.status(200).json({
      auth: true,
      message: "success user",
      user: req.user,
    });
  } else {
    res.status(401).json({
      auth: false,
      message: "Enauthorized",
      user: req.user,
    });
  }
});

module.exports = router;
