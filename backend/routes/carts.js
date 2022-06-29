const authenticateToken = require("../middleware/authenticateToken");
const Cart = require("../models/Cart");
const router = require("express").Router();

const { createCartValidation } = require("../utils/validation");

router.post("/create", authenticateToken, async (req, res) => {
  try {
    const { error } = createCartValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const newCart = new Cart({
      items: req.body.items,
      ownerId: req.user._id,
    });

    await newCart.save();

    res.json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/add/:id", authenticateToken, async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);

    if (!req.user._id === cart.ownerId)
      return res.status(400).json("You are not the owner");

    if (cart.items.includes(req.body.item)) {
      await cart.updateOne({
        $pull: { items: req.body.item },
      });

      return res.json("Removed item from the list");
    }

    await cart.updateOne({
      $push: { items: req.body.item },
    });

    res.json("Added item to the list!");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
