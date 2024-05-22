const express = require("express");
const router = express.Router();
const instructorScheduleController = require("../controllers/instructorScheduleController");

router.get("/get", instructorScheduleController);

