const express = require("express");
const router = express.Router();
const instructorController = require("../controllers/instructorController");

// Display instructor create form on GET.
router.get("/create", instructorController.instructor_create_get);

// Handle instructor create on POST.
router.post("/create", instructorController.instructor_create_post);

module.exports = router;

