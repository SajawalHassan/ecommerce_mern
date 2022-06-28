const authenticateToken = require("../middleware/authenticateToken");

const router = require("express").Router();

router.get("/get/:id", authenticateToken, async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
