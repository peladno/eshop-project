const nodemailer = require("nodemailer");
const config = require("../utils/config.js");
const logger = require("../logger/logger.js");

//TODO add wsp and msn 

function gmail(subject, message) {
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
    to: config.EMAIL,
    subject: subject,
    html: message,
  };

  transporter.sendMail(mailOptions, async function (error, info) {
    if (error) {
      logger.error(`Error: ${error}`)
      throw new Error(error);
    } else {
     logger.info({msg:"mailsent", info})
    }
  });
}

module.exports = { gmail };
