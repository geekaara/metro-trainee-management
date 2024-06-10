const express = require("express");
const router = express.Router();
const db = require("../test-db-connection"); // Adjusted path as necessary
const courseController = require("../controllers/courseController");



router.post("/add", courseController.courses_post);

// Route to get course details by id

router.get('/viewByName/:name', courseController.getCourseDetailsByName);

// router.get("/view/:id", courseController.getCourseDetailsByName);

// Route to update course by id
router.post('/updateByName/:name', courseController.updateCourseByName);

// Route to get all instructors
router.get("/instructors", courseController.instructor_get);

// Route to add new instructor (if needed)
router.post("/fetchinstructor", courseController.instructor_post);


//
// router.get("/courses", courseController.getCourseDetails);
//
// router.put("/update/:id", courseController.updateCourse);
//
// router.get("/view", courseController.instructor_get);
//
// router.post("/fetchinstructor",courseController.instructor_post );

module.exports = router;


