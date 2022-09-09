const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const userDAO = require("../../model/login.model");

const rounds = 12;
const hashPassword = (password) => {
  const hash = bcrypt.hash(password, rounds, (err, hash) => {
    if (err) {
      console.log(err)
    }
    return hash;
  });
  return hash;
};

const comparePassword = async (password, hash) => {
  const bool = bcrypt.compare(password, hash, (err, res) => {
    if (err) {
      console.log(err)
    }
    return res;
  });
  return bool;
};

passport.use(
  new LocalStrategy(async function (email, password, done) {
    let searchUser;
    try {
      searchUser = await userDAO.getByID(email);
    } catch (err) {
      throw done(err);
    }
    if (!searchUser) {
      console.log("user not found");
      return done(null, false);
    }
    const bool = await comparePassword(password, searchUser.password);
    if (bool === false) {
      console.log("invalid password");
      return done(null, false);
    }

    return done(null, searchUser);
  })
);

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  let user;
  try {
    user = await userDAO.getById(email);
  } catch (err) {
    throw done(err);
  }
  done(null, user);
});

module.exports = {
  passport,
  hashPassword,
};
