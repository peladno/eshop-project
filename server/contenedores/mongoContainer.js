const logger = require("../src/logger/logger");

class ContainerMongo {
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    try {
      const searched = await this.model.find();
      return searched;
    } catch (error) {
      logger.error(`Erro to get all elements ${error}`);
      throw new Error(error);
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
      if (newProduct.error) {
        return { error: newProduct.error };
      } else {
        return Saved;
      }
    } catch (error) {
      logger.error(`Error to save ${error}`);
      throw new Error(error);
    }
  }

  async getByID(id) {
    try {
      const search = await this.model.findOne({ _id: { $eq: id } });
      if (search.length === 0) {
        return { error: "product not found" };
      } else {
        return search;
      }
    } catch (error) {
      logger.error(`Cannot find id ${id} ${error}`);
      throw new Error(error);
    }
  }

  async deleteById(id) {
    try {
      const deleted = await this.model.findOneAndDelete({ _id: { $eq: id } });
      if (deleted.length === 0) {
        return { error: "product not found" };
      } else {
        return deleted;
      }
    } catch (error) {
      logger.error(`Cannot find id ${id} ${error}`);
      throw new Error(error);
    }
  }

  async deleteAll() {
    try {
      const deleted = await this.model.deleteMany({});
      if (deleted.length === 0) {
        return { error: "product not found" };
      } else {
        return deleted;
      }
    } catch (error) {
      logger.error(`Error deleting all ${error}`);
      throw new Error(error);
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
            timeStamp,
          },
        }
      );
      return updated;
    } catch (error) {
      logger.error(`Error updating ${id} ${error}`);
      throw new Error(error);
    }
  }

  async createCart(client, obj) {
    const date = new Date();
    const timeStamp = date.toLocaleString();
    try {
      const cart = new this.model({
        ...obj,
        timeStamp,
        client,
      });
      const saved = await cart.save();
      if (cart.error) {
        return { error: cart.error };
      } else {
        return saved;
      }
    } catch (error) {
      logger.error(`Error saving cart ${client} ${error}`);
      throw new Error(error);
    }
  }

  async editCart(obj, client) {
    try {
      const updated = await this.model.updateOne(
        { client: client },
        { $push: { products: obj } },
        { new: true }
      );
      return updated;
    } catch (err) {
      logger.err(`Error to edit cart ${err}`);
      throw new Error(err);
    }
  }

  async deleteProduct(client, idProduct) {
    try {
      const updated = await this.model.updateOne(
        { client: client },
        { $pull: { products: { _id: idProduct } } },
        { new: true }
      );
      return updated;
    } catch (error) {
      logger.error(`Error to delete product ${idProduct} from cart ${client} ${error}`);
      throw new Error(
        `Error to delete product ${idProduct} from cart ${client} ${error}`
      );
    }
  }

  async deleteCart(client) {
    try {
      const deleted = await this.model.deleteOne({
        client: { $eq: client },
      });
      return deleted;
    } catch (error) {
      logger.err(`Error deleting ${error}`);
      throw new Error(error);
    }
  }

  async getByCart(client) {
    try {
      const buscado = await this.model.findOne({
        cliente: {
          $eq: client,
        },
      });
      return buscado;
    } catch (error) {
      logger.error(`Error no se ecuentra id: ${client} ${error}`);
      throw new Error(error);
    }
  }
}

module.exports = ContainerMongo;
