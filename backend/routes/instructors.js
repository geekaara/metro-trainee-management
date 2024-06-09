const express = require("express");
const router = express.Router();
const instructorController = require("../controllers/instructorController");

// Display instructor create form on GET.
router.get("/fetch", instructorController.instructor_get);

// Get Instructor by Id
router.post("/fetchbyid", instructorController.fetchInstructorbyid);

// Handle instructor create on POST.
router.post("/create", instructorController.instructor_post);

// Update instructor
router.put("/update", instructorController.instructor_update);

// Delete instructor
router.delete("/remove", instructorController.instructor_delete);

router.get("/check-empId", instructorController.check_empId_exists);

router.get("/check-email", instructorController.check_email_exists);

module.exports = router;

