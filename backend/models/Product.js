const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
  },
  description: {
    type: String,
    required: true,
    min: 10,
  },
  shipsTo: {
    type: Array,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Products", productSchema);
