const logger = require("../../logger/logger");
const OrderModel = require("../../models/order.model");
const MongoDBClient = require("../clientDB.class");
const DAO = require("../DAO.class");

class CartDAOMongoDB extends DAO {
  constructor() {
    super();
    if (CartDAOMongoDB.instancia) return CartDAOMongoDB.instancia;
    this.model = OrderModel;
    this.connection = new MongoDBClient();
    CartDAOMongoDB.instancia = this;
  }

  async newOrder(cart) {
    try {
      const date = new Date();
      const timeStamp = date.toLocaleString();

      const cartTotal = cart.products.reduce((acc, curr) => {
        return acc + curr.count * curr.price;
      }, 0);
      const order = new this.model({
        products: cart.products,
        timeStamp: timeStamp,
        client: cart.client,
        total: cartTotal,
      });
      const saved = await order.save();
      return saved;
    } catch (error) {
      logger.error(error);
    }
  }

  async findAllOrdersByClient(client) {
    
  }
}

module.exports = CartDAOMongoDB;
