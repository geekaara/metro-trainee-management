const express = require("express");
const router = express.Router();
const instructorController = require("../controllers/instructorController");

// Display instructor create form on GET.
router.get("/create", instructorController.instructor_create_get);

// Handle instructor create on POST.
router.post("/create", instructorController.instructor_create_post);

module.exports = router;


// const asyncHandler = require("express-async-handler");
// const db = require("../test-db-connection"); // Adjust the path if necessary
//
// // Display instructor create form on GET.
// exports.instructor_create_get = asyncHandler(async (req, res, next) => {
//   res.send("NOT IMPLEMENTED: instructor create GET");
// });
//
// // Handle instructor create on POST.
// exports.instructor_create_post = asyncHandler(async (req, res, next) => {
//   const { title, firstName, lastName, otherName, gender, contactNo, email } =
//     req.body;
//   try {
//     const result = await db.query(
//       "INSERT INTO instructors (title, first_name, last_name, other_name, gender, contact_no, email) VALUES (?, ?, ?, ?, ?, ?, ?)",
//       [title, firstName, lastName, otherName, gender, contactNo, email]
//     );
//     res.status(201).send({
//       message: "Instructor added successfully!",
//       instructorID: result.insertId,
//     });
//   } catch (error) {
//     console.error("Failed to add instructor:", error.message);
//     res
//       .status(500)
//       .send({ message: "Failed to add instructor", error: error.message });
//   }
// });
