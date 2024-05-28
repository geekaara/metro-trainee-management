const asyncHandler = require("express-async-handler");
const db = require("../test-db-connection");

exports.schedule_get = asyncHandler(async (req, res, next) => {
  try {
    const { month, year } = req.query;

    // Query to fetch leaves for the specified month and year
    const leavesQuery = `
      SELECT
        id,
        instructorId,
        start_date,
        end_date,
        type
      FROM
        leaves
      WHERE
        MONTH(start_date) = ? AND YEAR(start_date) = ?
    `;

    const [leavesResults] = await db.query(leavesQuery, [month, year]);

    // Query to fetch module schedule for the specified month and year
    const modulesQuery = `
      SELECT
        s.date,
        m.module_name,
        s.instructorId
      FROM
        scheduleInstructors s
      JOIN
        module m ON s.moduleId = m.id
      WHERE
        MONTH(s.date) = ? AND YEAR(s.date) = ?
    `;

    const [modulesResults] = await db.query(modulesQuery, [month, year]);

    const combinedResults = {};

    // Iterate over leaves and generate leave dates array for each instructor
    leavesResults.forEach(leave => {
      const currentDate = new Date(leave.start_date);
      const endDate = new Date(leave.end_date);

      while (currentDate <= endDate) {
        const dateKey = currentDate.toISOString().slice(0, 10);
        if (!combinedResults[dateKey]) {
          combinedResults[dateKey] = {
            date: dateKey,
            entries: []
          };
        }
        combinedResults[dateKey].entries.push({
          instructorId: leave.instructorId,
          type: 'leave',
          reason: leave.type
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });

    // Add modules to the combined results for each instructor
    modulesResults.forEach(module => {
      const dateKey = module.date.toISOString().slice(0, 10);
      if (!combinedResults[dateKey]) {
        combinedResults[dateKey] = {
          date: dateKey,
          entries: []
        };
      }
      combinedResults[dateKey].entries.push({
        instructorId: module.instructorId,
        type: 'module',
        name: module.module_name
      });
    });

    // Convert combinedResults object to array
    const scheduleArray = Object.values(combinedResults);

    res.status(200).json(scheduleArray);
  } catch (error) {
    console.error("Failed to fetch schedule:", error.message);
    res.status(500).send({ message: "Failed to fetch schedule", error: error.message });
  }
});
