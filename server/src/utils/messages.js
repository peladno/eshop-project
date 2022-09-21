const nodemailer = require("nodemailer");
const config = require("../utils/config.js");
const logger = require("../logger/logger.js");
const accountSid = config.ACCOUNT_SID_TWILIO;
const authToken = config.AUTH_TOKEN_TWILIO;
const twilioWhatsapp = config.WHATSAPP;
const messagingServiceSid = config.MSG_SERVICE_SID;
const client = require("twilio")(accountSid, authToken);

function gmail(subject, message, email) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 857,
    auth: {
      user: config.EMAIL,
      pass: config.EMAILPASS,
    },
  });

  const mailOptions = {
    from: "Ecommerce server",
    to: email,
    subject: subject,
    html: message,
  };

  transporter.sendMail(mailOptions, async function (error, info) {
    if (error) {
      logger.error(`Error: ${error}`);
      throw new Error(error);
    } else {
      logger.info({ msg: "mailsent", info });
    }
  });
}

function whatsapp(msg, phone) {
  const from = "whatsapp:" + twilioWhatsapp;
  const to = "whatsapp:" + phone;
  client.messages
    .create({
      body: msg,
      from: from,
      to: to,
    })
    .then((message) => logger.info("Whatsapp sent"));
}

function sms(msg, to) {
  client.messages
    .create({
      body: msg,
      messagingServiceSid: messagingServiceSid,
      to: to,
    })
    .then((message) => logger.info("SMS sent."))
    .done();
}

module.exports = { gmail, whatsapp, sms };
