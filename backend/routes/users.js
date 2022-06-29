const authenticateToken = require("../middleware/authenticateToken");
const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

const { userEditValidation } = require("../utils/validation");

router.get("/get/:id", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/edit/:id", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!req.user._id === user._id)
      return res.status(403).json("You are not the owner");

    const { error } = userEditValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    await user.updateOne({ $set: req.body });

    res.json("User info changed!");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/delete/:id", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!req.user._id === user._id)
      return res.status(403).json("You are not the owner");

    await user.deleteOne();

    res.json("User deleted!");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
