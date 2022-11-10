const logger = require("../../logger/logger");
const CartModel = require("../../models/messages.model");
const MongoDBuser = require("../clientDB.class");
const DAO = require("../DAO.class");

class messagesDAOMongoDB extends DAO {
  constructor() {
    super();
    if (messagesDAOMongoDB.instancia) return messagesDAOMongoDB.instancia;
    this.model = CartModel;
    this.connection = new MongoDBuser();
    messagesDAOMongoDB.instancia = this;
  }

  async addMessage(from, message) {
    try {
      const saved = await this.model.create({
        body: message,
        from: from,
      });
      return saved;
    } catch (error) {
      logger.error(error);
    }
  }

  async getAllMessages() {
    try {
      const all = await this.model.find().populate("user");
      return all;
    } catch (error) {
      logger.error(error);
    }
  }
}

module.exports = messagesDAOMongoDB;
