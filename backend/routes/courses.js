const express = require("express");
const router = express.Router();
const db = require("../test-db-connection"); // Adjusted path as necessary
const courseController = require("../controllers/courseController");

// Endpoint to create a new course
// router.post("/add", async (req, res) => {
//   const { courseName, startDate, endDate, numberOfStudents } = req.body;
//   try {
//     const [result] = await db.query(
//         "INSERT INTO courses (name, start_date, end_date, number_of_students) VALUES (?, ?, ?, ?)",
//         [courseName, startDate, endDate, numberOfStudents]
//     );
//     res.status(201).send({
//       message: "Course added successfully!",
//       courseID: result.insertId,
//     });
//   } catch (error) {
//     console.error("Failed to add course:", error.message);
//     res
//         .status(500)
//         .send({ message: "Failed to add course", error: error.message });
//   }
// });

//router.put("/edit/:id", courseController.updateCourse);

router.post("/add", courseController.courses_post);

router.get("/view", courseController.instructor_get);
router.post("/fetchinstructor",courseController.instructor_post );

module.exports = router;



// const express = require("express");
// const router = express.Router();
// const db = require("../test-db-connection"); // Adjusted path as necessary
// const courseController = require("../controllers/courseController");
//
// // Endpoint to create a new course
// router.post("/add", async (req, res) => {
//   const { courseName, startDate, endDate, numberOfStudents } = req.body;
//   try {
//     const [result] = await db.query(
//       "INSERT INTO courses (name, start_date, end_date, number_of_students) VALUES (?, ?, ?, ?)",
//       [courseName, startDate, endDate, numberOfStudents]
//     );
//     res.status(201).send({
//       message: "Course added successfully!",
//       courseID: result.insertId,
//     });
//   } catch (error) {
//     console.error("Failed to add course:", error.message);
//     res
//       .status(500)
//       .send({ message: "Failed to add course", error: error.message });
//   }
// });
//
// router.put("/edit/:id", courseController.updateCourse);
//
// module.exports = router;
