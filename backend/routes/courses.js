const express = require("express");
const router = express.Router();
const db = require("../test-db-connection"); // Adjusted path as necessary
const courseController = require("../controllers/courseController");



router.post("/add", courseController.courses_post);

router.get("/view", courseController.instructor_get);

router.post("/fetchinstructor",courseController.instructor_post );

module.exports = router;


