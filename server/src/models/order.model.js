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
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      count: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
});

const orderModel = mongoose.model("order", OrderSchema);

module.exports = orderModel;
