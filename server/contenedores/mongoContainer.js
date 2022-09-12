const logger = require("../src/logger/logger");

class ContainerMongo {
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    try {
      const searched = await this.model.find();
      return searched;
    } catch (err) {
      logger.err(`Erro to get all elements ${err}`);
      throw new Error(`Erro to get all elements ${err}`);
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
    } catch (err) {
      logger.err(`Error to save ${err}`);
      throw new Error(`Error to save ${err}`);
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
    } catch (err) {
      logger.err(`Cannot find id ${id}`);
      throw new Error(`Cannot find id ${id}`);
    }
  }

  async deleteById(id) {
    try {
      const deleted = await this.model.deleteOne({ _id: { $eq: id } });
      if (deleted.length === 0) {
        return { error: "product not found" };
      } else {
        return deleted;
      }
    } catch (err) {
      logger.err(`Cannot find id ${id}`);
      throw new Error(`Cannot find id ${id}`);
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
    } catch (err) {
      logger.err(`Error deleting all ${err}`);
      throw new Error(`Error deleting all ${err}`);
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
    } catch (err) {
      logger.err(`Error updating ${id}`);
      throw new Error(`Error updating ${id}`);
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
      console.log(error);
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
      throw new Error(`Error to edit cart ${err}`);
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
    } catch (err) {
      logger.err(`Error to delete product ${idProduct} from cart ${client}`);
      throw new Error(
        `Error to delete product ${idProduct} from cart ${client}`
      );
    }
  }

  async deleteCart(client) {
    try {
      const deleted = await this.model.deleteOne({
        client: { $eq: client },
      });
      return deleted;
    } catch (err) {
      logger.err(`Error deleting ${err}`);
      throw new Error(`Error deleting ${err}`);
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
      logger.error(`Error no se ecuentra id: ${client}`);
      throw new Error(`Error no se ecuentra id: ${client}`);
    }
  }
}

module.exports = ContainerMongo;
