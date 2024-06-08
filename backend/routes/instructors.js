const express = require("express");
const router = express.Router();
const instructorController = require("../controllers/instructorController");

// Display instructor create form on GET.
router.get("/fetch", instructorController.instructor_get);

// Handle instructor create on POST.
router.post("/create", instructorController.instructor_post);

// Update instructor
router.put("/update", instructorController.instructor_update);

// Delete instructor
router.delete("/remove", instructorController.instructor_delete);

module.exports = router;

