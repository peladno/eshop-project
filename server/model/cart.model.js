const { mongoose, Schema, model } = require("mongoose");

const cartCollection = "carts";
const CartSchema = new Schema({
  timeStamp: {
    type: String,
    required: true,
  },
  client: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
    default:0
  },
  products: [
    {
      _id: {
        type: String,
        required: true,
      },
      timeStamp: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      code: {
        type: Number,
        required: true,
      },
      photo: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      count: {
        type: Number,
        required: true,
      }
    },
    
  ],
});

const cartModel = model(cartCollection, CartSchema);

const ContenedorMongo = require("../contenedores/mongoContainer");
const cartDAO = new ContenedorMongo(cartModel);

module.exports = cartDAO;
