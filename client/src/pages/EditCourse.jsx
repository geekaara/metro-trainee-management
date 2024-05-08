import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Divider } from "@material-ui/core";
import "../css/EditCourse.css";
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

function EditCourse() {
  // State variable to store course details
  const [courses, setCourses] = useState([
    {
      id: 1,
      courseName: "Induction",
      startDate: "2024-01-16",
      endDate: "2024-02-02",
      numberOfStudents: 20,
      schedule: [
        { day: 1, date: "2024-01-15", weekday: "Monday", description: "" },
        { day: 2, date: "2024-01-15", weekday: "Tuesday", description: "" },
        // Add more schedule items as needed
      ],
    },
    // Add more courses as needed
  ]);

  // State variables for search and selected course
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle course selection
  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
  };

  // Function to handle saving changes
  const handleSaveChanges = () => {
    // Logic to save changes to the selected course
    console.log("Changes saved:", selectedCourse);
  };

  return (
    <div className="container">
      <h1 className="edit-h1">Edit Course</h1>
      {/* Search input for filtering courses */}
      <TextField
        label="Search Courses"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {courses.map((course) => (  // Move IconButton inside map function
                <IconButton key={course.id} onClick={() => handleCourseSelect(course)}>
                  <SearchIcon />
                </IconButton>
              ))}
            </InputAdornment>
          ),
          style: { paddingRight: "30px" } // Adjust the padding to fit the search icon properly
        }}
        style={{ marginBottom: "20px" }}
      />

      {/* Display filtered courses */}
      {courses.map((course) => (
        <div key={course.id}>
          <Button
            
            onClick={() => handleCourseSelect(course)}
            style={{ marginBottom: "10px" }}
            variant="contained"
            color="primary"
          >
            {/* {course.courseName} - {course.startDate} to {course.endDate} */}
            Search
          </Button>
        </div>
      ))}

      {/* Display selected course details for editing */}
      {selectedCourse && (
        <div>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="h5">Editing Course: {selectedCourse.courseName}</Typography>
          <Grid container spacing={2} style={{ marginTop: "20px" }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Course Name"
                variant="outlined"
                fullWidth
                value={selectedCourse.courseName}
                onChange={(e) =>
                  setSelectedCourse({ ...selectedCourse, courseName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Start Date"
                type="date"
                variant="outlined"
                fullWidth
                value={selectedCourse.startDate}
                onChange={(e) =>
                  setSelectedCourse({ ...selectedCourse, startDate: e.target.value })
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="End Date"
                type="date"
                variant="outlined"
                fullWidth
                value={selectedCourse.endDate}
                onChange={(e) =>
                  setSelectedCourse({ ...selectedCourse, endDate: e.target.value })
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Number of Students"
                type="number"
                variant="outlined"
                fullWidth
                value={selectedCourse.numberOfStudents}
                onChange={(e) =>
                  setSelectedCourse({
                    ...selectedCourse,
                    numberOfStudents: parseInt(e.target.value),
                  })
                }
              />
            </Grid>
            {/* Schedule details */}
            <Grid item xs={12}>
              <Typography variant="h6">Schedule Details</Typography>
            </Grid>
            {selectedCourse.schedule.map((item, index) => (
              <Grid container item xs={12} key={index}>
                <Grid item xs={2}>
                  <TextField
                    label="Day Number"
                    variant="outlined"
                    value={item.day}
                    
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    label="Date"
                    variant="outlined"
                    value={item.date}
                    
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Weekday"
                    variant="outlined"
                    value={item.weekday}
                    
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    value={item.description}
                    onChange={(e) => {
                      const updatedSchedule = [...selectedCourse.schedule];
                      updatedSchedule[index].description = e.target.value;
                      setSelectedCourse({
                        ...selectedCourse,
                        schedule: updatedSchedule,
                      });
                    }}
                  />
                </Grid>
              </Grid>
            ))}
          </Grid>
          {/* Button to save changes */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveChanges}
            style={{ marginTop: "20px" }}
          >
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
}

export default EditCourse;
