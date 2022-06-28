const router = require("express").Router();
const User = require("../models/User");

const { userRegisterValidation } = require("../utils/validation");

router.post("/register", async (req, res) => {
  try {
    // Validate info
    const { error } = userRegisterValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const email = await User.findOne({ email: req.body.email });
    console.log(email);
    if (email) return res.status(400).json("Email already exists");

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    await newUser.save();

    res.json(newUser);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
