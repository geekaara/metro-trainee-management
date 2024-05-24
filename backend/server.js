const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
require("dotenv").config();
const cors = require("cors");

const instructorsRoute = require("./routes/instructors");
const coursesRoute = require("./routes/courses");
const userRoutes = require('./routes/userRoutes');
const leavesRoutes = require('./routes/leaves');
const modulesRoute = require('./routes/modules');
const viewScheduleRoutes = require('./routes/instructorSchedule');

app.use(express.json());
app.use(cors());

// Use routes
app.use("/instructors", instructorsRoute);
app.use("/courses", coursesRoute);
app.use("/modules", modulesRoute);
app.use('/users', userRoutes);
app.use('/leaves', leavesRoutes);
app.use('/instructorschedule', viewScheduleRoutes);

app.get("/api", (req, res) => {
  res.json({ message: "Trainee Management!" });
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const express = require("express");
// const app = express();
// const PORT = process.env.PORT || 3001;
// require("dotenv").config();
// const cors = require("cors");
//
// const instructorsRoute = require("./routes/instructors");
// const coursesRoute = require("./routes/courses");
// const userRoutes = require('./routes/userRoutes');
// const leavesRoutes = require('./routes/leaves');
// const modulesRoute = require('./routes/modules');
// const viewScheduleRoutes = require('./routes/instructorSchedule');
//
// app.use(express.json());
// app.use(cors());
//
// // Use routes
// app.use("/instructors", instructorsRoute);
// app.use("/courses", coursesRoute);
// app.use("/modules", modulesRoute);
// app.use('/users', userRoutes);
// app.use('/leaves', leavesRoutes);
// app.use('/instructorschedule', viewScheduleRoutes);
//
// app.get("/api", (req, res) => {
//   res.json({ message: "Trainee Management!" });
// });
//
// // Catch 404 and forward to error handler
// app.use((req, res, next) => {
//   res.status(404).send("Sorry can't find that!");
// });
//
// // Error handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });
//
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

