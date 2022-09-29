const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
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
    default: 0,
  },
  stock: {
    type: Number,
    required: true,
    default: 1,
  },
});

const productModel = mongoose.model("products", ProductSchema);


module.exports = productModel;
