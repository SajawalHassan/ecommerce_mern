const router = require("express").Router();
const authenticateToken = require("../middleware/authenticateToken");
const Product = require("../models/Product");
const {
  createProductValidation,
  editProductValidation,
} = require("../utils/validation");

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

router.put("/edit/:id", authenticateToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!req.user._id === product.ownerId)
      return res.status(400).json("You are not the owner");

    const { error } = editProductValidation(req.body);
    if (error) res.status(400).json(error.details[0].message);

    if (req.body === null)
      return res.status(400).json("Please fill in one of the fields");

    await product.updateOne({ $set: req.body });

    res.json("Product info changed!");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/delete/:id", authenticateToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!req.user._id === product.ownerId)
      return res.status(400).json("You are not the owner");

    await product.deleteOne();

    res.json("Product deleted!");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
