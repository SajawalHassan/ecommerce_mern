const authenticateToken = require("../middleware/authenticateToken");
const Cart = require("../models/Cart");
const router = require("express").Router();

const { createCartValidation } = require("../utils/validation");

router.post("/create", authenticateToken, async (req, res) => {
  try {
    const { error } = createCartValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const newCart = new Cart({
      products: req.body.products,
      ownerId: req.user._id,
    });

    await newCart.save();

    res.json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/change/:id", authenticateToken, async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);

    if (!req.user._id === cart.ownerId)
      return res.status(400).json("You are not the owner");

    if (cart.products.includes(req.body.product)) {
      await cart.updateOne({
        $pull: { products: req.body.product },
      });

      return res.json("Removed product from the list");
    }

    await cart.updateOne({
      $push: { products: req.body.product },
    });

    res.json("Added product to the list!");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
