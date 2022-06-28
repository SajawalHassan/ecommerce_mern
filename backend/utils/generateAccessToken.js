const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = function (payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10m",
  });
};
