const express = require("express");
const router = express.Router();
const instructorScheduleController = require("../controllers/instructorScheduleController");

//route for GET requests to "/view" that uses the schedule_get method from the instructorScheduleController
router.get("/view", instructorScheduleController.schedule_get);

module.exports = router;