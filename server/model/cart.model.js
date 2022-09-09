const { mongoose, Schema, model } = require("mongoose");

const cartCollection = "carts";
const CartSchema = new Schema({
  timestamp: {
    type: String,
    required: true,
  },
  cliente: {
    type: String,
    required: true,
  },
  productos: [
    {
      id: {
        type: String,
        required: true,
      },
      timestamp: {
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
      photo: { type: String },
      price: {
        type: Number,
        required: true,
        default: 0,
      },
      stock: {
        type: Number,
        required: true,
        default: 0,
      },
    },
  ],
});

const cartModel = model(cartCollection, CartSchema);

const ContenedorMongo = require("../contenedores/mongoContainer");
const cartDAO = new ContenedorMongo(cartModel);

module.exports = cartDAO;
