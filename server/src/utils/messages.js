const nodemailer = require("nodemailer");
const config = require("../utils/config.js");
const logger = require("../logger/logger.js");
const accountSid = config.ACCOUNT_SID_TWILIO;
const authToken = config.AUTH_TOKEN_TWILIO;
const twilioWhatsapp = config.WHATSAPP;
const messagingServiceSid = config.MSG_SERVICE_SID;
const client = require("twilio")(accountSid, authToken);
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
        throw new Error(err);
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

function orderMail(order) {
  ejs.renderFile(
    path.join(process.cwd(), "/public/views/emailOrder.ejs"),
    { order },
    (err, data) => {
      if (err) {
        logger.error(err);
      } else {
        const mailOptions = {
          from: `Eshop 📩`,
          to: `${order.user.email}`,
          subject: `Order N° ${order._id}`,
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

function whatsappOrder(name, phone, cart) {
  const from = "whatsapp:" + twilioWhatsapp;
  const to = "whatsapp:" + phone;
  ejs.renderFile(
    path.join(process.cwd(), "/public/views/emailOrder.ejs"),
    { name, phone, cart },
    (err, data) => {
      if (err) {
        logger.error(err);
      } else {
        client.messages
          .create({
            body: data,
            from: from,
            to: to,
          })
          .then((message) => logger.info("Whatsapp sent"));
      }
    }
  );
}

function smsOrder(name, phone, cart) {
  ejs.renderFile(
    path.join(process.cwd(), "/public/views/emailOrder.ejs"),
    { name, phone, cart },
    (err, data) => {
      if (err) {
        logger.error(err);
      } else {
        client.messages
          .create({
            body: data,
            messagingServiceSid: messagingServiceSid,
            to: phone,
          })
          .then((message) => logger.info("SMS sent."))
          .done();
      }
    }
  );
}

module.exports = { newUserEmail, whatsappOrder, smsOrder, orderMail };
