const cartFactory = require("../DAOs/factoryDAO/CartDAOfactory.class");
const DAO = cartFactory.get();
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
      res.status(200).json({
        message: info,
        allCarts,
      });
    }
  } catch (error) {
    logger.error(error);
    throw new Error(error);
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
    res.status(200).json({
      message: info,
      data: saved,
    });
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
}

async function getCartById(req, res) {
  try {
    const id = req.params.id;
    const cart = await DAO.getCartById(id);
    const info = "Cart found";
    const error = "Cart not found";
    logger.info(info);
    if (!cart) {
      res.status(400).json({
        error_message: error,
      });
    } else {
      res.status(200).json({
        message: info,
        cart,
      });
    }
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
}

async function addProductToCart(req, res) {
  try {
    const id = req.params.id;
    const newProduct = req.body;
    const saved = await DAO.editCart(newProduct, id);
    const info = "Product saved";
    logger.info(info);
    res.status(200).json({
      message: info,
      saved,
    });
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
}

async function deleteProductCart(req, res) {
  try {
    const { id, id_product } = req.params;
    const clientID = id;
    const prodID = id_product;

    const deleteProduct = await DAO.deleteProduct(clientID, prodID);
    const info = "Product deleted";
    logger.info(info);
    res.status(200).json({
      message: info,
      deleteProduct,
    });
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
}

async function orderProcess(req, res) {
  try {
    const client = req.params.id;
    const search = await DAO.getCartById(client);
    const { name, email, phone } = await UserDao.getUser(client);
    const subject = "Your order...";
    const messageOrder = `${name} Your order is in process`;
    messages.sms(messageOrder, phone);
    messages.whatsapp(messageOrder, phone);
    messages.gmail(subject, messageOrder, email);
    await DAO.deleteCart(client).then((res) => {
      res.status(200).json(`Carrito ${client}: Se borró con éxito.`);
    });
    res.status(200).json({ message: "Product in process", search });
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
}

async function deleteCartById(req, res) {
  try {
    const client = req.params.id;
    const deleted = await DAO.deleteCart(client);
    const info = "Cart deleted";
    logger.info(info);
    res.status(200).json({ message: info, data: deleted });
  } catch (error) {
    logger.error(error);
    throw new Error(error);
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
