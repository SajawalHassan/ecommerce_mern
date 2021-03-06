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
  images: {
    type: Array,
    requried: true,
    min: 1,
  },
  shipsTo: {
    type: Array,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Number,
    required: true,
    min: 1,
  },
  currency: {
    type: String,
    requried: true,
  },
  ownerId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Products", productSchema);
