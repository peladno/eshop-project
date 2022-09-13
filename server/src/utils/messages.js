const nodemailer = require("nodemailer");
const config = "../utils/config.js";
const logger = "../logger/logger.js";

const emailUser = config.EMAIL;
const emailPass = config.EMAILPASS;

function gmail(asunto, mensaje) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  const mailOptions = {
    from: "Ecommerce server",
    to: emailUser,
    subject: asunto,
    html: mensaje,
  };

  transporter.sendMail(mailOptions, async function (error, info) {
    if (error) {
      logger.error("ERROR!!!!!!", error);
    } else {
      logger.info("Email sent. ");
    }
  });
}
