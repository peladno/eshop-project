const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
  timeStamp: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
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

const cartModel = mongoose.model("cart", CartSchema);

module.exports = cartModel;
