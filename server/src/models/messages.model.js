const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    body: {
      type: String, required: true ,
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", MessageSchema);
