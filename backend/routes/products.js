const router = require("express").Router();
const authenticateToken = require("../middleware/authenticateToken");
const Product = require("../models/Product");

router.get("/all", authenticateToken, async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
