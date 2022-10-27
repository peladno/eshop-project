const cartFactory = require("../DAOs/factoryDAO/CartDAOfactory.class");
const DAO = cartFactory.get();
const logger = require("../logger/logger");

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
    const cartID = req.params.id;
    const cart = await DAO.getCartById(cartID);
    const info = "Cart found";
    logger.info(info);
    if (!cart) {
      const newCart = await DAO.saveEmptyCart(cartID);
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
    const cartID = req.params.id;
    const newProduct = req.body;
    const saved = await DAO.editCart(newProduct, cartID);
    const info = "Product saved";
    logger.info(info);
    res.status(200).json(saved);
  } catch (error) {
    logger.error(error);
  }
}

async function deleteProductCart(req, res) {
  try {
    const userID = req.params.id;
    const prodID = req.params.id_product;
    const deleteProduct = await DAO.deleteProduct(userID, prodID);
    const info = "Product deleted";
    logger.info(info);
    res.status(200).json(deleteProduct);
  } catch (error) {
    logger.error(error);
  }
}

async function deleteCartById(req, res) {
  try {
    const userID = req.params.id;
    const deleted = await DAO.deleteCart(userID);
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
  deleteCartById,
};
