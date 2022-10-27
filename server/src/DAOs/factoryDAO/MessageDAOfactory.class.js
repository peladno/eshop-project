const config = require("../../utils/config");
const messagesDAOMongo = require("../messages/messagesDAO.mongodb");

class MessageDAOFactory {
  static get() {
    switch (config.TYPE_DB) {
      case "mongodb":
        return new messagesDAOMongo();
      default:
        return new messagesDAOMongo();
    }
  }
}

module.exports = MessageDAOFactory;
