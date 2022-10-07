const logger = require("../../logger/logger");
const CartModel = require("../../models/cart.model");
const MongoDBClient = require("../clientDB.class");
const DAO = require("../DAO.class");

class CartDAOMongoDB extends DAO {
  constructor() {
    super();
    if (CartDAOMongoDB.instancia) return CartDAOMongoDB.instancia;
    this.model = CartModel;
    this.connection = new MongoDBClient();
    CartDAOMongoDB.instancia = this;
  }

  async getAll() {
    try {
      const searched = await this.model.find();
      return searched;
    } catch (error) {
      logger.error(`Error to get all elements ${error}`);
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
      return saved;
    } catch (error) {
      logger.error(`Error saving cart ${client} ${error}`);
      throw new Error(error);
    }
  }

  async editCart(obj, client) {
    const date = new Date();
    const timeStamp = date.toLocaleString();
    try {
      const cart = await this.model.findOne({ client: { $eq: client } });
      if (cart) {
        const itemFound = cart.products.findIndex(
          (item) => item._id === obj._id
        );
        if (itemFound !== -1) {
          let product = cart.products[itemFound];
          product.count += obj.count;
          cart.total = cart.products.reduce((acc, curr) => {
            return acc + curr.count * curr.price;
          }, 0);
          const saved = await cart.save();
          return saved;
        } else {
          cart.total = cart.products.reduce((acc, curr) => {
            return acc + curr.count * curr.price;
          }, 0);
          cart.products.push(obj);
          const saved = await cart.save();
          return saved;
        }
      } else {
        const newCart = new this.model({
          products: obj,
          timeStamp: timeStamp,
          client: client,
          total: obj.count * obj.price,
        });
        const saved = await newCart.save();
        return saved;
      }
    } catch (error) {
      logger.error(`Error to edit cart ${error}`);
      throw new Error(error);
    }
  }
  //TODO mejorar logica
  async deleteProduct(client, idProduct) {
    try {
      const cart = await this.model.findOne({ client: { $eq: client } });
      const itemFound = cart.products.findIndex(
        (item) => item._id === idProduct
      );
      if (cart.total < 0) {
        cart.bill = 0;
      }
      if (itemFound === -1) {
        return { error: "product not found" };
      } else {
        let product = cart.products[itemFound];
        cart.total -= product.count * product.price;
        cart.products.splice(itemFound, 1);
        cart.total = cart.products.reduce((acc, curr) => {
          return acc + curr.count * curr.price;
        }, 0);
        const saved = await cart.save();
        return saved;
      }
    } catch (error) {
      logger.error(
        `Error to delete product ${idProduct} from cart ${client} ${error}`
      );
      throw new Error(error);
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

  async getCartById(client) {
    try {
      const buscado = await this.model.findOne({
        client: {
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

module.exports = CartDAOMongoDB;
