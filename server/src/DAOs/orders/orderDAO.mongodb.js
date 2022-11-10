const logger = require("../../logger/logger");
const OrderModel = require("../../models/order.model");
const MongoDBuser = require("../clientDB.class");
const DAO = require("../DAO.class");

class CartDAOMongoDB extends DAO {
  constructor() {
    super();
    if (CartDAOMongoDB.instancia) return CartDAOMongoDB.instancia;
    this.model = OrderModel;
    this.connection = new MongoDBuser();
    CartDAOMongoDB.instancia = this;
  }

  async newOrder(cart) {
    try {
      const date = new Date();
      const timeStamp = date.toLocaleString();

      const cartTotal = cart.products.reduce((acc, curr) => {
        return acc + curr.count * curr._id.price;
      }, 0);
      const order = new this.model({
        products: cart.products,
        timeStamp: timeStamp,
        user: cart.user,
        total: cartTotal,
      });
      const saved = await order.save();
      return saved;
    } catch (error) {
      logger.error(error);
    }
  }

  async findAllOrdersByUser(user) {
    try {
      const cart = await this.model
        .find({
          user: {
            $eq: user,
          },
        })
        .populate("user")
        .populate("products._id");

      return cart;
    } catch (error) {
      logger.error(error);
    }
  }
}

module.exports = CartDAOMongoDB;
