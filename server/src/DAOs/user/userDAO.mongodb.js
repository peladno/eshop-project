const UserModel = require("../../models/user.model");
const MongoDBClient = require("../clientDB.class");
const DAO = require("../DAO.class");
const logger = require("../../logger/logger");

class UserDAOMongoDB extends DAO {
  constructor() {
    super();
    if (UserDAOMongoDB.instancia) return UserDAOMongoDB.instancia;
    this.model = UserModel;
    this.connection = new MongoDBClient();
    UserDAOMongoDB.instancia = this;
  }

  async getUser(username) {
    try {
      const user = await this.model.findOne({ username: { $eq: username } });
      return user;
    } catch (error) {
      logger.error("Error finding user", error);
    }
  }

  async saveUser(user) {
    try {
      const newUser = await this.model.create(user);
      return newUser;
    } catch (error) {
      logger.error("Error saving user", error);
    }
  }
}

module.exports = UserDAOMongoDB;
