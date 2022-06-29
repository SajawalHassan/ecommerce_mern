const router = require("express").Router();
const authenticateToken = require("../middleware/authenticateToken");
const Product = require("../models/Product");
const { createProductValidation } = require("../utils/validation");

router.get("/all", authenticateToken, async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/create", authenticateToken, async (req, res) => {
  try {
    const { error } = createProductValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      images: req.body.images,
      shipsTo: req.body.shipsTo,
      price: req.body.price,
      inStock: req.body.inStock,
      currency: req.body.currency,
      ownerId: req.user._id,
    });

    await newProduct.save();

    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
