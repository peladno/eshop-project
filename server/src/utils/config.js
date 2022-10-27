require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 8080,
  PASS2: process.env.PASS2,
  EMAIL: process.env.EMAIL,
  EMAILPASS: process.env.EMAILPASS,
  ACCOUNT_SID_TWILIO: process.env.ACCOUNT_SID_TWILIO,
  AUTH_TOKEN_TWILIO: process.env.AUTH_TOKEN_TWILIO,
  MSG_SERVICE_SID: process.env.MSG_SERVICE_SID,
  WHATSAPP: process.env.WHATSAPP,
  TYPE_DB: process.argv[2] || process.env.TYPE_DB,
  mongoLocal: {
    client: "mongodb",
    URL: `mongodb+srv://peladno:${process.env.PASS}@coderhouseproject.zgltv4f.mongodb.net/?retryWrites=true&w=majority`,
    URL2: `mongodb://localhost:${process.env.PORT_MONGO}/sessions`,
  },
  WEB: process.env.WEB,
};
