const asyncHandler = require("express-async-handler");
const db = require("../test-db-connection"); // Adjust the path if necessary

// Display instructor create form on GET.
exports.instructor_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Instructor create GET");
});

// Handle instructor create on POST.
exports.instructor_create_post = asyncHandler(async (req, res, next) => {
  const { title, firstName, lastName, otherName, gender, contactNo, email } = req.body;
  try {
    // Check if the email already exists in the database
    const [existingInstructor] = await db.query(
        "SELECT * FROM instructors WHERE email = ?",
        [email]
    );

    if (existingInstructor.length > 0) {
      return res.status(400).send({
        message: "An instructor with this email already exists.",
      });
    }

    // If the email does not exist, proceed to insert the new instructor
    const [result] = await db.query(
        "INSERT INTO instructors (title, first_name, last_name, other_name, gender, contact_no, email) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [title, firstName, lastName, otherName, gender, contactNo, email]
    );

    res.status(201).send({
      message: "Instructor added successfully!",
      instructorID: result.insertId,
    });
  } catch (error) {
    console.error("Failed to add instructor:", error.message);
    res.status(500).send({ message: "Failed to add instructor", error: error.message });
  }
});



// const asyncHandler = require("express-async-handler");
// const db = require("../test-db-connection"); // Adjust the path if necessary
//
// // Display instructor create form on GET.
// exports.instructor_create_get = asyncHandler(async (req, res, next) => {
//   res.send("NOT IMPLEMENTED: Instructor create GET");
// });
//
// // Handle instructor create on POST.
// exports.instructor_create_post = asyncHandler(async (req, res, next) => {
//   const { title, firstName, lastName, otherName, gender, contactNo, email } = req.body;
//   try {
//     const [result] = await db.query(
//         "INSERT INTO instructors (title, first_name, last_name, other_name, gender, contact_no, email) VALUES (?, ?, ?, ?, ?, ?, ?)",
//         [title, firstName, lastName, otherName, gender, contactNo, email]
//     );
//     res.status(201).send({
//       message: "Instructor added successfully!",
//       instructorID: result.insertId,
//     });
//   } catch (error) {
//     console.error("Failed to add instructor:", error.message);
//     res.status(500).send({ message: "Failed to add instructor", error: error.message });
//   }
// });


// //const Instructor = require("../models/instructor");
// const asyncHandler = require("express-async-handler");
//
// // Display list of all instructors.
// exports.instructor_list = asyncHandler(async (req, res, next) => {
//   res.send("NOT IMPLEMENTED: instructor list");
// });
//
// // Display detail page for a specific instructor.
// exports.instructor_detail = asyncHandler(async (req, res, next) => {
//   res.send(`NOT IMPLEMENTED: instructor detail: ${req.params.id}`);
// });
//
// // Display instructor create form on GET.
// exports.instructor_create_get = asyncHandler(async (req, res, next) => {
//   res.send("NOT IMPLEMENTED: instructor create GET");
// });
//
// // Handle instructor create on POST.
// exports.instructor_create_post = asyncHandler(async (req, res, next) => {
//   res.send("NOT IMPLEMENTED: instructor create POST");
// });
//
// // Display instructor delete form on GET.
// exports.instructor_delete_get = asyncHandler(async (req, res, next) => {
//   res.send("NOT IMPLEMENTED: instructor delete GET");
// });
//
// // Handle instructor delete on POST.
// exports.instructor_delete_post = asyncHandler(async (req, res, next) => {
//   res.send("NOT IMPLEMENTED: instructor delete POST");
// });
//
// // Display instructor update form on GET.
// exports.instructor_update_get = asyncHandler(async (req, res, next) => {
//   res.send("NOT IMPLEMENTED: instructor update GET");
// });
//
// // Handle instructor update on POST.
// exports.instructor_update_post = asyncHandler(async (req, res, next) => {
//   res.send("NOT IMPLEMENTED: instructor update POST");
// });
