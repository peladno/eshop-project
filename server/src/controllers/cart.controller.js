const cartFactory = require("../DAOs/factoryDAO/CartDAOfactory.class");
const orderFactory = require("../DAOs/factoryDAO/orderDAOfactory.class");
const DAO = cartFactory.get();
const OrderDao = orderFactory.get();
const userFactory = require("../DAOs/factoryDAO/UserDAOfactory.class");
const UserDao = userFactory.get();
const logger = require("../logger/logger");
const messages = require("../utils/messages");

async function getAll(req, res) {
  try {
    const allCarts = await DAO.getAll();
    if (!allCarts) {
      const error = `No carts`;
      res.status(404).json({
        error_description: error,
      });
    } else {
      const info = "Carts found";
      logger.info(info);
      res.status(200).json(allCarts);
    }
  } catch (error) {
    logger.error(error);
  }
}

async function saveCart(req, res) {
  try {
    const id = req.params.id;
    const cart = {
      products: [],
    };
    const saved = await DAO.createCart(id, cart);
    const info = "Cart Saved";
    logger.info(info);
    res.status(200).json(saved);
  } catch (error) {
    logger.error(error);
  }
}

async function getCartById(req, res) {
  try {
    const id = req.params.id;
    const cart = await DAO.getCartById(id);
    const info = "Cart found";
    logger.info(info);
    if (!cart) {
      const newCart = await DAO.saveEmptyCart(id);
      res.status(200).json(newCart);
    } else {
      res.status(200).json(cart);
    }
  } catch (error) {
    logger.error(error);
  }
}

async function addProductToCart(req, res) {
  try {
    const id = req.params.id;
    const newProduct = req.body;
    const saved = await DAO.editCart(newProduct, id);
    const info = "Product saved";
    logger.info(info);
    res.status(200).json(saved);
  } catch (error) {
    logger.error(error);
  }
}

async function deleteProductCart(req, res) {
  try {
    const clientID = req.params.id;
    const prodID = req.params.id_product;
    const deleteProduct = await DAO.deleteProduct(clientID, prodID);
    const info = "Product deleted";
    logger.info(info);
    res.status(200).json(deleteProduct);
  } catch (error) {
    logger.error(error);
  }
}

async function orderProcess(req, res) {
  try {
    const client = req.params.id;
    const cart = await OrderDao.newOrder(client);
    logger.info(cart);
    if (cart) {
      await UserDao.getUser(client)
        .then((user) => {
          messages.orderMail(user.name, user.email, cart);
        })
        .then(res.status(200).json({ message: "Product in process", cart }));
      // messages.smsOrder(user.name, user.phone, user.cart);
      // messages.whatsappOrder(user.name, user.phone, user.cart);
    } else {
      res.send(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    logger.error(error);
  }
}

async function deleteCartById(req, res) {
  try {
    const client = req.params.id;
    const deleted = await DAO.deleteCart(client);
    const info = "Cart deleted";
    logger.info(info);
    res.status(200).json(deleted);
  } catch (error) {
    logger.error(error);
  }
}

module.exports = {
  getAll,
  getCartById,
  saveCart,
  addProductToCart,
  deleteProductCart,
  orderProcess,
  deleteCartById,
};
