const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user.model");
const logger = require("../logger/logger");

passport.use(
  "login",
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        logger.info("Incorrect username");
        return done(null, false);
      }
      const isMatch = await user.isValidPassword(password);
      if (!isMatch) {
        logger.info("Incorrect password");
        return done(null, false);
      } else {
        logger.info("Logged in successfully");
        return done(null, user);
      }
    } catch (error) {
      logger.error(`Error login ${error}`);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
