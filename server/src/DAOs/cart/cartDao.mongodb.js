const logger = require("../../logger/logger");
const CartModel = require("../../models/cart.model");
const MongoDBuser = require("../clientDB.class");
const DAO = require("../DAO.class");
const ObjectId = require("mongoose").Types.ObjectId;

class CartDAOMongoDB extends DAO {
  constructor() {
    super();
    if (CartDAOMongoDB.instancia) return CartDAOMongoDB.instancia;
    this.model = CartModel;
    this.connection = new MongoDBuser();
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

  async createCart(user, obj) {
    const date = new Date();
    const timeStamp = date.toLocaleString();
    try {
      const cart = new this.model({
        ...obj,
        timeStamp,
        user,
      });
      const saved = await cart.save();
      return saved;
    } catch (error) {
      logger.error(`Error saving cart ${user} ${error}`);
      throw new Error(error);
    }
  }

  async saveEmptyCart(user) {
    const date = new Date();
    const timeStamp = date.toLocaleString();
    try {
      const cart = new this.model({
        products: [],
        timeStamp,
        user,
      });
      const saved = await cart.save();
      return saved;
    } catch (error) {
      logger.error(`Error saving cart ${user} ${error}`);
      throw new Error(error);
    }
  }

  async editCart(obj, user) {
    const date = new Date();
    const timeStamp = date.toLocaleString();
    try {
      const cart = await this.model.findOne({ user: { $eq: user } });

      if (cart) {
        const itemFound = cart.products.findIndex(
          (item) => item._id.toString() === obj._id.toString()
        );
        if (itemFound !== -1) {
          let product = cart.products[itemFound];
          product.count += obj.count;
          const saved = await cart.save();
          return saved;
        } else {
          cart.products.push(obj);
          const saved = await cart.save();
          return saved;
        }
      } else {
        const newCart = new this.model({
          products: obj,
          timeStamp: timeStamp,
          user: user,
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
  async deleteProduct(user, idProduct) {
    try {
      const updated = await this.model.updateOne(
        { user: new ObjectId(user) },
        { $pull: { products: { _id: idProduct } } },
        { new: true }
      );
      return updated;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteCart(user) {
    try {
      const deleted = await this.model.deleteOne({
        user: { $eq: user },
      });
      return deleted;
    } catch (error) {
      logger.err(`Error deleting ${error}`);
      throw new Error(error);
    }
  }

  async getCartById(user) {
    try {
      const searched = await this.model
        .findOne({
          user: {
            $eq: user,
          },
        })
        .populate("user")
        .populate("products._id");
      return searched;
    } catch (error) {
      logger.error(`Error no se ecuentra id: ${user} ${error}`);
      throw new Error(error);
    }
  }
}

module.exports = CartDAOMongoDB;
