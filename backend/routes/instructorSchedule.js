const express = require("express");
const router = express.Router();
const instructorScheduleController = require("../controllers/instructorScheduleController");

router.get("/view", instructorScheduleController.schedule_get);

module.exports = router;