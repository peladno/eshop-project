//TODO cambiar modelo para solo guardar el id del producto

const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
  timeStamp: {
    type: String,
    required: true,
  },
  client: {
    type: String,
    required: true,
  },
  products: [
    {
      _id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
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

const cartModel = mongoose.model("cart", CartSchema);

module.exports = cartModel;
