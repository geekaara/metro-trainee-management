//const Instructor = require("../models/instructor");
const asyncHandler = require("express-async-handler");

// Display list of all instructors.
exports.instructor_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: instructor list");
});

// Display detail page for a specific instructor.
exports.instructor_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: instructor detail: ${req.params.id}`);
});

// Display instructor create form on GET.
exports.instructor_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: instructor create GET");
});

// Handle instructor create on POST.
exports.instructor_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: instructor create POST");
});

// Display instructor delete form on GET.
exports.instructor_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: instructor delete GET");
});

// Handle instructor delete on POST.
exports.instructor_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: instructor delete POST");
});

// Display instructor update form on GET.
exports.instructor_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: instructor update GET");
});

// Handle instructor update on POST.
exports.instructor_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: instructor update POST");
});
