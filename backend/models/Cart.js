const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  ownerId: {
    type: String,
    required: true,
  },
  products: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Carts", cartSchema);
