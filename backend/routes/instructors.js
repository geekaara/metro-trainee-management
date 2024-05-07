const express = require("express");
const router = express.Router();

const instructor_controller = require("../controllers/instructorController");

router.get("/add", instructor_controller.instructor_create_get);
router.post("/add", instructor_controller.instructor_create_post);

module.exports = router;