const productFactory = require("../DAOs/factoryDAO/ProductsDAOfactory.class");
const logger = require("../logger/logger");
const productModel = require("../models/products.model");
const ApiFeatures = require("../utils/apiFeatures");
const DAO = productFactory.get();

async function getAll(req, res) {
  try {
    const query = req.query;
    const apiFeatures = new ApiFeatures(productModel.find(), query)
      .search()
      .filter();
    const products = await apiFeatures.query;
    if (!products) {
      const error = "Products not found";
      logger.error(error);
      return res.status(404).json({
        error_description: error,
      });
    } else {
      res.status(200).json(products);
    }
  } catch (error) {
    logger.error(error);
  }
}

async function getByID(req, res) {
  try {
    const id = req.params.id;
    const product = await DAO.getByID(id);
    if (!product) {
      const error = `Product ${id} not found`;
      res.status(404).json({
        error_description: error,
      });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    logger.error(error);
  }
}

async function deleteById(req, res) {
  try {
    const id = req.params.id;
    const deleted = await DAO.deleteById(id);
    if (!deleted) {
      const error = `Product not deleted ${id}`;
      res.status(404).json({
        error_description: error,
      });
    } else {
      res.status(200).json(deleted);
    }
  } catch (error) {
    logger.error(error);
  }
}

async function save(req, res) {
  try {
    const newProduct = req.body;
    const data = await DAO.save(newProduct);
    if (!data) {
      const error = `Product not saved`;
      res.status(400).json({
        error_description: error,
      });
    } else {
      const info = `Product was saved`;
      logger.info(info);
      return res.status(201).json(data);
    }
  } catch (error) {
    res.status(400);
    logger.error(error);
  }
}

async function updateById(req, res) {
  try {
    const id = req.params.id;
    const newProduct = req.body;
    const updatedProduct = await DAO.updateItems(id, newProduct);
    if (!updatedProduct) {
      const error = `Product not found ${id}`;
      res.status(404).json({
        error_description: error,
      });
    } else {
      const info = `Product updated`;
      logger.info(info);
      res.status(200).json(updatedProduct);
    }
  } catch (error) {
    logger.error(error);
  }
}

module.exports = {
  getAll,
  getByID,
  save,
  deleteById,
  updateById,
};
