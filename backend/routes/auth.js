const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateAccessToken = require("../utils/generateAccessToken");
const jwt = require("jsonwebtoken");
const Token = require("../models/Token");

require("dotenv").config();

const { userRegisterValidation } = require("../utils/validation");

router.post("/register", async (req, res) => {
  try {
    // Validate info
    const { error } = userRegisterValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    const email = await User.findOne({ email: req.body.email });
    if (email) return res.status(400).json("Email already exists");

    // Hashing password
    const hashedPass = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    await newUser.save();

    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    if (!req.body.password) return res.status(400).json("Password is required");

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json("Invalid email");

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).json("Invalid password");

    const payload = {
      _id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = jwt.sign(
      user.toJSON(),
      process.env.REFRESH_TOKEN_SECRET
    );

    const newRefreshToken = new Token({
      token: refreshToken,
    });

    await newRefreshToken.save();

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/refresh_token", async (req, res) => {
  try {
    const refreshToken = req.body.token;
    const _refreshToken = await Token.findOne({ token: refreshToken });

    if (!refreshToken) return res.sendStatus(401);
    if (!_refreshToken) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);

      const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      };

      const accessToken = generateAccessToken(payload);

      res.json({ accessToken });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/logout", async (req, res) => {
  try {
    await Token.findOneAndDelete({ token: req.body.token });

    res.json("Logged out!");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
