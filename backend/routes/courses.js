const express = require("express");
const router = express.Router();

router.get("/add", (req, res) => {
  res.json({message: "add course!"});
});

module.exports = router;