const express = require("express");
const router = express.Router();
const leaveController = require("../controllers/leaveController");

router.get("/get", leaveController.leave_get);

router.post("/create", leaveController.leave_create);

module.exports = router;