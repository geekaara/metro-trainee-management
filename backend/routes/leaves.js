const express = require("express");
const router = express.Router();
const leaveController = require("../controllers/leaveController");

router.get("/fetch", leaveController.leave_get);

router.post("/create", leaveController.leave_create_post);

router.get("/fetchbyid", leaveController.getLeavesById);

module.exports = router;