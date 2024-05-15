const asyncHandler = require("express-async-handler");
const db = require("../config/database");

// Controller to update a course
exports.updateCourse = asyncHandler(async (req, res, next) => {
  const courseId = req.params.id;
  const { courseName, startDate, endDate, numberOfStudents, schedule } =
    req.body;

  try {
    // Update course details
    await db.query(
      "UPDATE courses SET name = ?, start_date = ?, end_date = ?, number_of_students = ? WHERE id = ?",
      [courseName, startDate, endDate, numberOfStudents, courseId]
    );

    // Update schedule details (assuming you have a separate table for the schedule)
    await Promise.all(
      schedule.map((item) =>
        db.query(
          "UPDATE course_schedule SET day = ?, date = ?, weekday = ?, description = ? WHERE course_id = ? AND day = ?",
          [
            item.day,
            item.date,
            item.weekday,
            item.description,
            courseId,
            item.day,
          ]
        )
      )
    );

    res.status(200).json({ message: "Course updated successfully!" });
  } catch (error) {
    console.error("Failed to update course:", error.message);
    res
      .status(500)
      .send({ message: "Failed to update course", error: error.message });
  }
});
