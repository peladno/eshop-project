const express = require("express");
const router = express.Router();
const { passport, hashPassword } = require("../utils/passport");
const { isAuth } = require("../utils/middlewares");
const userDAO = require("../../model/login.model");

router.get("/", (req, res) => {
  if (req.session.email) {
    res.redirect("/home");
  } else {
    res.redirect("/login");
  }
});

router.post("/signup", async (req, res) => {
  const { email, name, address, age, phone, avatar, password } = req.body;

  let newUsuario = null;
  try {
    newUsuario = await userDAO.getByID(email);
  } catch (err) {
    throw new Error(err);
  }
  if (newUsuario) {
    res.render("signup-failure");
  } else {
    const hash = hashPassword(password);
    const userData = {
      email,
      name,
      address,
      age,
      phone,
      avatar,
      password: hash,
    };
    try {
      await userDAO.save(userData);
      console.log(userData);
    } catch (err) {
      throw new Error(err);
    }
    res.redirect("/login");
    console.log(userData);
  }
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signup-failure", (req, res) => {
  res.render("signup-failure");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login-failure",
  })
);

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/login-failure", (req, res) => {
  res.render("login-failure");
});

router.get("/home", isAuth, (req, res) => {
  res.cookie("user", req.user.email, {
    signed: false,
  });
  res.render("home", {
    name: req.user.name,
    email: req.user.email,
    address: req.user.address,
    age: req.user.age,
    phone: req.user.phone,
    avatar: req.user.avatar,
  });
});

router.get("/fired", (req, res) => {
  res.render("logout", {
    user: req.user?.name,
  });
});

router.get("/logout", (req, res) => {
  if (req.user.email) {
    req.session.destroy((err) => {
      if (!err) res.redirect("/");
      else res.send({ status: "Logout ERROR ", body: err });
    });
  }
});

/*
passport.use(
  "login",
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const isMatch = await user.isValidPassword(password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password" });
      } else {
        return done(null, user, { message: "Logged in successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  })
);

passport.use(
  "signup",
  new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (user) {
          return done(null, false, { message: "User already exists" });
        }
        const newUser = await User.create({
          username,
          password,
          name: req.body.name,
        });
        return done(null, newUser);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

//Routes
router.get("/", (req, res) => {
  if (req.user?.username) {
    res.redirect("/home");
  } else {
    res.redirect("/login");
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/home",
    failureRedirect: "/login-failure",
  })
);

router.get("/login-failure", (req, res) => {
  res.render("login-failure");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post(
  "/signup",
  passport.authenticate("signup", {
    successRedirect: "/home",
    failureRedirect: "/signup-failure",
  })
);

router.get("/signup-failure", (req, res) => {
  res.render("signup-failure");
});

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) next();
  else res.redirect("/login");
}

router.get("/home", checkAuthentication, (req, res) => {
  res.render("home", { user: req.user?.name });
});

router.get("/fired", (req, res) => {
  res.render("logout", {
    user: req.user?.name,
  });
});

router.get("/logout", (req, res) => {
  if (req.user?.username) {
    req.session.destroy((err) => {
      if (!err) res.redirect("/");
      else res.send({ status: "Logout ERROR ", body: err });
    });
  }
});*/

module.exports = router;
