const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
require("dotenv").config();
const cors = require("cors");

const instructorsRoute = require("./routes/instructors");
const coursesRoute = require("./routes/courses");
const userRoutes = require('./routes/userRoutes');


app.use(express.json());
app.use(cors());

// Use routes
app.use("/instructors", instructorsRoute);
app.use("/courses", coursesRoute);
app.use('/users', userRoutes);

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
//
// app.use(express.json());
// app.use(cors()); // Enable CORS
//
// // Use routes
// app.use("/instructors", instructorsRoute);
// app.use("/courses", coursesRoute);
//
// app.use("/api", (req, res) => {
//   res.json({ message: "Trainee Management!" });
// });
//
// // Catch 404 and forward to error handler
// app.use((req, res, next) => {
//   res.status(404).send("Sorry can't find that!");
// });
//
// // Error handler
// app.set((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });
//
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
