const nodemailer = require("nodemailer");
const config = require("../utils/config.js");
const logger = require("../logger/logger.js");
const ejs = require("ejs");
const path = require("path");

const Email = nodemailer.createTransport({
  service: "gmail",
  port: 857,
  auth: {
    user: config.EMAIL,
    pass: config.EMAILPASS,
  },
});

function newUserEmail(name, email) {
  ejs.renderFile(
    path.join(process.cwd(), "/public/views/emailNewUser.ejs"),
    { name, email },
    (err, data) => {
     
      if (err) {
        logger.error(err);
      } else {
        const mailOptions = {
          from: `Eshop 📩`,
          to: `${email}`,
          subject: "New User",
          html: data,
        };

        Email.sendMail(mailOptions, (error, info) => {
          if (error) {
            return logger.error(error);
          }
          logger.info("Message sent: %s", info.messageId);
        });
      }
    }
  );
}

function orderMail(cart) {
  ejs.renderFile(
    path.join(process.cwd(), "/public/views/emailOrder.ejs"),
    { cart },
    (err, data) => {
      console.log(cart.user.email);
      if (err) {
        logger.error(err);
        console.log(err)
      } else {
        const mailOptions = {
          from: `Eshop 📩`,
          to: `${cart.user.email}`,
          subject: `Order N° ${cart._id}`,
          html: data,
        };

        Email.sendMail(mailOptions, (error, info) => {
          if (error) {
            return logger.error(error);
          }
          logger.info("Message sent: %s", info.messageId);
        });
      }
    }
  );
}



module.exports = { newUserEmail, orderMail };
