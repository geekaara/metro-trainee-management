const express = require("express");
const router = express.Router();
const leaveController = require("../controllers/leaveController");

router.get("/view", leaveController.leave_get);

router.post("/create", leaveController.leave_create_post);

router.get("/search", leaveController.leave_search_get);

module.exports = router;