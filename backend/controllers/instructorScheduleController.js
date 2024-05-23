const asyncHandler = require("express-async-handler");
const db = require("../test-db-connection"); 

exports.schedule_get = asyncHandler(async (req, res, next) => {
  try {

    const { month, year, userid } = req.query;

    // Query to fetch leaves for the specified month, year, and userid
    const leavesQuery = `
      SELECT
        userid,
        startdate,
        enddate,
        type
      FROM
        leaves
      WHERE
        MONTH(startdate) = ? AND YEAR(startdate) = ? AND userid = ?
    `;

    const [leavesResults] = await db.query(leavesQuery, [month, year, userid]);

    // Query to fetch course schedule for the specified month, year, and userid
    const coursesQuery = `
      SELECT
        s.date,
        c.title
      FROM
        schedule s
        INNER JOIN course c ON s.course_id = c.id
      WHERE
        MONTH(s.date) = ? AND YEAR(s.date) = ? AND s.instructor_id = ?
    `;

    const [coursesResults] = await db.query(coursesQuery, [month, year, userid]);

    
    const combinedResults = [];

    // Group courses by date
    const coursesMap = {};
    coursesResults.forEach(course => {
      const date = course.date.toISOString().slice(0, 10);
      if (!coursesMap[date]) {
        coursesMap[date] = [];
      }
      coursesMap[date].push({ date, title: course.title });
    });

    // Iterate over leaves and generate leave dates array
    leavesResults.forEach(leave => {
      const leaveDates = [];
      const currentDate = new Date(leave.startdate);
      const endDate = new Date(leave.enddate);
      
      while (currentDate <= endDate) {
        leaveDates.push(currentDate.toISOString().slice(0, 10));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      combinedResults.push({
        instructor: userid,
        month,
        year,
        leaves: leaveDates.map(date => ({ date, reason: leave.type })),
        courses: coursesMap[leaveDates[0]] || []
      });
    });

    res.status(200).json(combinedResults);
  } catch (error) {
    console.error("Failed to fetch schedule:", error.message);
    res.status(500).send({ message: "Failed to fetch schedule", error: error.message });
  }
});
