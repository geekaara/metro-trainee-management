const asyncHandler = require("express-async-handler");
const db = require("../test-db-connection");

exports.schedule_get = asyncHandler(async (req, res, next) => {
  try {
    const { month, year } = req.query;

    // Query to fetch leaves for the specified month and year
    const leavesQuery = `
      SELECT
        l.id,
        l.instructorId,
        l.start_date,
        l.end_date,
        l.type AS reason,
        CONCAT(i.title, ' ', i.first_name, ' ', i.last_name) AS instructorName
      FROM
        leaves l
      JOIN
        instructors i ON l.instructorId = i.id
      WHERE
        MONTH(l.start_date) = ? AND YEAR(l.start_date) = ?
    `;

    const [leavesResults] = await db.query(leavesQuery, [month, year]);

    // Query to fetch module schedule for the specified month and year
    const modulesQuery = `
      SELECT
        s.date,
        m.module_name AS title,
        s.instructorId,
        CONCAT(i.title, ' ', i.first_name, ' ', i.last_name) AS instructorName
      FROM
        scheduleInstructors s
      JOIN
        module m ON s.moduleId = m.id
      JOIN 
        instructors i ON s.instructorId = i.id
      WHERE
        MONTH(s.date) = ? AND YEAR(s.date) = ?
    `;

    const [modulesResults] = await db.query(modulesQuery, [month, year]);

    // Combine leaves and modules for each instructor
    const instructorsData = {};

    // Process leaves
    leavesResults.forEach(leave => {
      const startDate = new Date(leave.start_date);
      const endDate = new Date(leave.end_date);
      const datesInRange = getDatesInRange(startDate, endDate);
      
      datesInRange.forEach(date => {
        const formattedDate = date.toISOString().slice(0, 10);
        if (!instructorsData[leave.instructorId]) {
          instructorsData[leave.instructorId] = {
            instructorId: leave.instructorId,
            instructor: leave.instructorName,
            month: getMonthName(month),
            year: year,
            leaves: [],
            modules: []
          };
        }
        instructorsData[leave.instructorId].leaves.push({
          date: formattedDate,
          reason: leave.reason
        });
      });
    });

    // Process modules
    modulesResults.forEach(module => {
      const moduleDate = new Date(module.date); 
      if (!instructorsData[module.instructorId]) {
        instructorsData[module.instructorId] = {
          instructorId: module.instructorId,
          instructor: module.instructorName,
          month: getMonthName(month),
          year: year,
          leaves: [],
          modules: []
        };
      }
      instructorsData[module.instructorId].modules.push({
        date: moduleDate.toISOString().slice(0, 10),
        title: module.title
      });
    });

    // Convert instructorsData object to array
    const instructorsArray = Object.values(instructorsData);

    res.status(200).json(instructorsArray);
  } catch (error) {
    console.error("Failed to fetch schedule:", error.message);
    res.status(500).send({ message: "Failed to fetch schedule", error: error.message });
  }
});

// Function to get month name from month number
function getMonthName(monthNumber) {
  const months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];
  return months[monthNumber - 1];
}

// Function to get all dates between two dates
function getDatesInRange(startDate, endDate) {
  const dates = [];
  let currentDate = startDate;
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}
