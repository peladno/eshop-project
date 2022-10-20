//TODO cambiar modelo para solo guardar el id del producto

const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
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

const orderModel = mongoose.model("order", OrderSchema);

module.exports = orderModel;
