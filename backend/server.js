const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

const instructorsRoute = require('./routes/instructors');
const coursesRoute = require('./routes/courses');

app.use(express.json());
// Use routes
app.use('/instructors', instructorsRoute);
app.use('/courses', coursesRoute);

app.get("/api", (req, res) => {
  res.json({message: "Trainee Management!"});
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
