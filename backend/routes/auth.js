const router = require("express").Router();

router.get("/register", async (req, res) => {
  try {
    res.json("Hello World!");
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
