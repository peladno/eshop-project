const passport = require("passport");
const jwt = require("jsonwebtoken");
const logger = require("../logger/logger");

const login = async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        res.status(400).json({
          message: "Something is not right",
        });
        return next(err);
      }
      req.login(user, { session: false }, async (err) => {
        if (err) {
          res.send(err);
        }
        const body = {
          _id: user._id,
          username: user.username,
          role: user.role,
          email: user.email,
          address:user.address,
          photo: user.photo,
          name: user.name,
          phone:user.phone
        };
        const token = jwt.sign({ user: body }, "secret");
        return res.json({ user, token });
      });
    } catch (error) {
      logger.error(`error login error ${error}`);
    }
  })(req, res, next);
};

const adminAuth = async (req, res, next) => {
  const headers = req.headers["authorization"];
  const token = headers.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }
  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Not authorized" });
    } else {
      if (decoded.user.role !== "admin") {
        return res.status(401).json({ message: "Not authorized" });
      } else {
        next();
      }
    }
  });
};

const userAuth = async (req, res, next) => {
  const headers = req.headers["authorization"];
  if(headers) {
    const token = headers.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }
  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
    req.user = decoded.user;
    next();
  });
  } else {
    logger.error("Header token missing")
  }
};

exports.login = login;
exports.adminAuth = adminAuth;
exports.userAuth = userAuth;
