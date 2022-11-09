const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  timeStamp: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  total: {
    type: Number,
    required: true,
    default: 0,
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
