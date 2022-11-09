const cartFactory = require("../DAOs/factoryDAO/CartDAOfactory.class");
const orderFactory = require("../DAOs/factoryDAO/orderDAOfactory.class");
const DAO = cartFactory.get();
const OrderDao = orderFactory.get();
const logger = require("../logger/logger");
const messages = require("../utils/messages");

async function orderProcess(req, res) {
  try {
    const userID = req.params.id;
    const searchCart = await DAO.getCartById(userID);
    const cart = await OrderDao.newOrder(searchCart);

    if (cart) {
      messages.orderMail(searchCart);
      res.status(200).json({ message: "Product in process", cart });
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    logger.error(error);
  }
}

async function allOrders(req, res) {
  const userID = req.params.id;
  try {
    const searchOrders = await OrderDao.findAllOrdersByUser(userID);
    if (searchOrders) {
      res.status(200).json(searchOrders);
    } else {
      res.status(404).json({ message: "No orders found" });
    }
  } catch (error) {
    logger.error(error);
  }
}

module.exports = {
  orderProcess,
  allOrders,
};
