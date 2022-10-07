const productFactory = require("../DAOs/factoryDAO/ProductsDAOfactory.class");
const ProductDTO = require("../DTO/productDTO.class");
const logger = require("../logger/logger");

const DAO = productFactory.get();

async function getAll(req, res) {
  try {
    const products = await DAO.getAll();
    if (!products) {
      const error = "No products found";
      logger.error(error);
      return res.status(404).json({
        error_description: error,
      });
    } else {
      const productsDTO = products.map((item) => {
        return new ProductDTO(
          item._id,
          item.name,
          item.photo,
          item.price,
          item.code,
          item.description,
          item.timeStamp,
          item.stock
        );
      });
      res.status(200).json(productsDTO);
    }
  } catch (error) {
    logger.error(error);
    throw new Error(error);
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
    throw new Error(error);
  }
}

async function deleteById(req, res) {
  try {
    const id = req.params.id;
    const deleted = await DAO.deleteById(id);
    if (!deleted) {
      const error = `Product not found ${id}`;
      res.status(404).json({
        error_description: error,
      });
    } else {
      res.status(200).json(deleted);
    }
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
}

async function save(req, res) {
  try {
    const { name, code, description, photo, stock, price } = req.body;
    const data = await DAO.save({
      name,
      code,
      description,
      photo,
      stock,
      price,
    });
    const info = `Product ${name} was saved`;
    logger.info(info);
    return res.status(201).json(data);
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
}

async function updateById(req, res) {
  try {
    const id = req.params.id;
    const newProduct = req.body;
    const updatedProduct = await DAO.updateItems(id, newProduct);
    const info = `Product updated`;
    logger.info(info);
    res.status(200).json(updatedProduct);
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
}

module.exports = {
  getAll,
  getByID,
  save,
  deleteById,
  updateById,
};
