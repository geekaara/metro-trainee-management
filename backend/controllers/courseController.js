const asyncHandler = require("express-async-handler");
const db = require("../test-db-connection");

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

exports.courses_post = asyncHandler(async (req, res, next) => {
  const {
    courseName,
    startDate,
    endDate,
    groupName,
    numberOfStudents,
    schedule,
  } = req.body;

  try {
    // Start a transaction
    await db.query('START TRANSACTION');

    // Insert course data
    const [courseResult] = await db.query(
      `
      INSERT INTO courses (course_name, start_date, end_date, group_name, number_of_students)
      VALUES (?, ?, ?, ?, ?)
      `,
      [courseName, startDate, endDate, groupName, numberOfStudents]
    );
    const courseId = courseResult.insertId;

    // Insert schedule data
    for (const item of schedule) {
      const [scheduleResult] = await db.query(
        `
        INSERT INTO schedule (courseId, moduleId, date)
        VALUES (?, ?, ?)
        `,
        [courseId, item.moduleId, item.date]
      );
      const scheduleId = scheduleResult.insertId;

      // Insert scheduleInstructors data
      if (item.instructorId) {
        await db.query(
          `
          INSERT INTO scheduleInstructors (courseId, moduleId, date, instructorId)
          VALUES (?, ?, ?, ?)
          `,
          [courseId, item.moduleId,item.date,item.instructorId]
        );
      }
    }

    // Commit the transaction
    await db.query('COMMIT');
    res.status(201).json({ message: 'Course and schedule saved successfully' });
  } catch (error) {
    // Rollback the transaction
    await db.query('ROLLBACK');
    console.error('Error saving course and schedule:', error);
    res.status(500).json({ message: 'Error saving course and schedule', error });
  }
});

exports.instructor_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: leaves GET");
  });


  exports.instructor_post = asyncHandler(async (req, res, next) => {
    const { moduleid, date } = req.body;

    try {
        console.log("Received request with moduleid:", moduleid, "and date:", date);

        // Get all qualifications needed for the specified module
        const [moduleQualifications] = await db.query(
            `
            SELECT qualificationId 
            FROM moduleQualification 
            WHERE moduleId = ?
            `,
            [moduleid]
        );

        const requiredQualifications = moduleQualifications.map(q => q.qualificationId);
        console.log("Required qualifications:", requiredQualifications);

        // Get all instructors and their qualifications
        const [instructorQualifications] = await db.query(
            `
            SELECT i.id AS instructorId, iq.qualificationId 
            FROM instructors i
            INNER JOIN instructorQualification iq ON i.id = iq.instructorId
            `
        );
        console.log("Instructor qualifications:", instructorQualifications);

        // Group qualifications by instructor
        const instructorQualMap = instructorQualifications.reduce((acc, row) => {
            if (!acc[row.instructorId]) {
                acc[row.instructorId] = [];
            }
            acc[row.instructorId].push(row.qualificationId);
            return acc;
        }, {});
        console.log("Instructor qualification map:", instructorQualMap);

        // Filter instructors based on qualification match
       // Filter instructors based on qualification match
        const qualifiedInstructors = Object.keys(instructorQualMap).filter(instructorId => {
          const instructorQuals = instructorQualMap[instructorId];
          return requiredQualifications.some(q => instructorQuals.includes(q));
        });

        console.log("Qualified instructors:", qualifiedInstructors);

        if (qualifiedInstructors.length === 0) {
            console.log("No qualified instructors found.");
            return res.json([]); // No qualified instructors found
        }

        // Check availability and leave status
        const [result] = await db.query(
            `
            SELECT DISTINCT i.id, i.title, i.first_name, i.last_name
            FROM instructors i
            LEFT JOIN leaves l ON i.id = l.instructorId AND ? BETWEEN l.start_date AND l.end_date
            LEFT JOIN scheduleInstructors si ON i.id = si.instructorId AND si.date = ?
            LEFT JOIN instructorAvailability ia ON i.id = ia.instructorId
            WHERE 
                i.id IN (?)
                AND ia.day = DAYNAME(?)
                AND l.instructorId IS NULL
                AND si.instructorId IS NULL
            `,
            [date, date, qualifiedInstructors, date]
        );
        console.log("Final result:", result);

        res.json(result);
    } catch (error) {
        console.error("Error:", error);
        next(error);
    }
});
