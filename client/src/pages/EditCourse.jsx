import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Divider,
  Paper,
  Container,
  Box,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "../css/EditCourse.css";

function EditCourse() {
  // State for search query and selected course
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
// Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
// Handle course selection after search
  const handleCourseSelect = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/courses/viewByName/${searchQuery.trim()}`);
      console.log("Course details fetched:", response.data); // Log the response data
      setSelectedCourse(response.data);
    } catch (error) {
      console.error("Error fetching course details:", error);
      if (error.response && error.response.status === 404) {
        alert("Course not found");
      } else {
        alert(`An error occurred while fetching course details: ${error.message}`);
      }
    }
  };
// Handle saving changes to the course
  const handleSaveChanges = async () => {
    try {
      const payload = {
        startDate: selectedCourse.course.start_date,
        endDate: selectedCourse.course.end_date,
        groupName: selectedCourse.course.group_name,
        numberOfStudents: selectedCourse.course.number_of_students,
        schedule: selectedCourse.schedule.map(item => ({
          date: item.date,
          moduleId: item.moduleId,
          instructorId: item.instructorId
        })),
      };
      await axios.post(
          `http://localhost:3001/courses/updateByName/${selectedCourse.course.course_name}`,
          payload
      );
      alert("Changes saved successfully!");
    } catch (error) {
      console.error("Error saving changes:", error);
      alert(`Error saving changes: ${error.message}`);
    }
  };

  return (
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
          <Typography variant="h4" gutterBottom>
            Edit Course
          </Typography>
          <TextField
              label="Search Courses"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
              fullWidth
              InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleCourseSelect} aria-label="search">
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                ),
              }}
              sx={{ marginBottom: 2 }}
          />

          {selectedCourse && (
              <Box sx={{ padding: 2 }}>
                <Divider sx={{ margin: "20px 0" }} />
                <Typography variant="h5" gutterBottom>
                  Editing Course: {selectedCourse.course.course_name}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                        label="Course Name"
                        variant="outlined"
                        fullWidth
                        value={selectedCourse.course.course_name}
                        onChange={(e) =>
                            setSelectedCourse({
                              ...selectedCourse,
                              course: {
                                ...selectedCourse.course,
                                course_name: e.target.value,
                              },
                            })
                        }
                        sx={{ marginBottom: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                        label="Start Date"
                        type="date"
                        variant="outlined"
                        fullWidth
                        value={selectedCourse.course.start_date}
                        onChange={(e) =>
                            setSelectedCourse({
                              ...selectedCourse,
                              course: {
                                ...selectedCourse.course,
                                start_date: e.target.value,
                              },
                            })
                        }
                        InputLabelProps={{
                          shrink: true,
                        }}
                        sx={{ marginBottom: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                        label="End Date"
                        type="date"
                        variant="outlined"
                        fullWidth
                        value={selectedCourse.course.end_date}
                        onChange={(e) =>
                            setSelectedCourse({
                              ...selectedCourse,
                              course: {
                                ...selectedCourse.course,
                                end_date: e.target.value,
                              },
                            })
                        }
                        InputLabelProps={{
                          shrink: true,
                        }}
                        sx={{ marginBottom: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                        label="Number of Students"
                        type="number"
                        variant="outlined"
                        fullWidth
                        value={selectedCourse.course.number_of_students}
                        onChange={(e) =>
                            setSelectedCourse({
                              ...selectedCourse,
                              course: {
                                ...selectedCourse.course,
                                number_of_students: parseInt(e.target.value),
                              },
                            })
                        }
                        sx={{ marginBottom: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
                      <InputLabel id="group-label">Group</InputLabel>
                      <Select
                          labelId="group-label"
                          value={selectedCourse.course.group_name}
                          onChange={(e) =>
                              setSelectedCourse({
                                ...selectedCourse,
                                course: {
                                  ...selectedCourse.course,
                                  group_name: e.target.value,
                                },
                              })
                          }
                          label="Group"
                      >
                        <MenuItem value="North">North</MenuItem>
                        <MenuItem value="South">South</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Schedule Details
                    </Typography>
                  </Grid>
                  {selectedCourse.schedule.map((item, index) => (
                      <Grid container item xs={12} key={index} spacing={2}>
                        <Grid item xs={4}>
                          <TextField
                              label="Date"
                              variant="outlined"
                              fullWidth
                              value={item.date}
                              onChange={(e) => {
                                const updatedSchedule = [...selectedCourse.schedule];
                                updatedSchedule[index].date = e.target.value;
                                setSelectedCourse({
                                  ...selectedCourse,
                                  schedule: updatedSchedule,
                                });
                              }}
                              sx={{ marginBottom: 2 }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                              label="Module Name"
                              variant="outlined"
                              fullWidth
                              value={item.module_name || ""}
                              onChange={(e) => {
                                const updatedSchedule = [...selectedCourse.schedule];
                                updatedSchedule[index].module_name = e.target.value;
                                setSelectedCourse({
                                  ...selectedCourse,
                                  schedule: updatedSchedule,
                                });
                              }}
                              sx={{ marginBottom: 2 }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                              label="Instructor Name"
                              variant="outlined"
                              fullWidth
                              value={item.instructor_name || ""}
                              onChange={(e) => {
                                const updatedSchedule = [...selectedCourse.schedule];
                                updatedSchedule[index].instructor_name = e.target.value;
                                setSelectedCourse({
                                  ...selectedCourse,
                                  schedule: updatedSchedule,
                                });
                              }}
                              sx={{ marginBottom: 2 }}
                          />
                        </Grid>
                      </Grid>
                  ))}
                </Grid>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSaveChanges}
                    sx={{ marginTop: 2 }}
                >
                  Save Changes
                </Button>
              </Box>
          )}
        </Paper>
      </Container>
  );
}

export default EditCourse;
