const ProductModel = require("../../models/products.model");
const MongoDBClient = require("../clientDB.class");
const DAO = require("../DAO.class");
const logger = require("../../logger/logger");

class ProductDAOMongoDB extends DAO {
  constructor() {
    super();
    if (ProductDAOMongoDB.instancia) return ProductDAOMongoDB.instancia;
    this.model = ProductModel;
    this.connection = new MongoDBClient();
    ProductDAOMongoDB.instancia = this;
  }
  async getAll() {
    try {
      const searched = await this.model.find();
      return searched;
    } catch (error) {
      logger.error(`Error to get all elements ${error}`);
    }
  }

  async save(obj) {
    try {
      const date = new Date();
      const timeStamp = date.toLocaleString();
      const object = {
        ...obj,
        timeStamp,
      };
      const newProduct = new this.model(object);
      const Saved = await newProduct.save();
      if (newProduct.errors) {
        return { error: newProduct.errors };
      } else {
        return Saved;
      }
    } catch (error) {
      logger.error(`Error to save ${error}`);
    }
  }

  async getByID(id) {
    try {
      const search = await this.model.findOne({ _id: { $eq: id } });
      if (!search) {
        return { error: "product not found" };
      } else {
        return search;
      }
    } catch (error) {
      logger.error(`Cannot find id ${id} ${error}`);
    }
  }

  async deleteById(id) {
    try {
      const deleted = await this.model.findOneAndDelete({ _id: { $eq: id } });
      return deleted;
    } catch (error) {
      logger.error(`Cannot find id ${id} ${error}`);
    }
  }

  async deleteAll() {
    try {
      const deleted = await this.model.deleteMany({});
      if (!deleted) {
        return { error: "products not found" };
      } else {
        return deleted;
      }
    } catch (error) {
      logger.error(`Error deleting all ${error}`);
    }
  }

  async updateItems(id, product) {
    const date = new Date();
    const timeStamp = date.toLocaleString();
    try {
      const updated = await this.model.updateOne(
        { _id: { $eq: id } },
        {
          $set: {
            name: product.name,
            price: product.price,
            description: product.description,
            photo: product.photo,
            code: product.code,
            stock: product.stock,
            category: product.category,
            timeStamp,
          },
        }
      );
      if (!updated) {
        return { error: "product not found" };
      } else {
        return updated;
      }
    } catch (error) {
      logger.error(`Error updating ${id} ${error}`);
    }
  }
}

module.exports = ProductDAOMongoDB;
