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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

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
                      <IconButton onClick={handleCourseSelect}>
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



// import React, { useState } from "react";
// import axios from "axios";
// import {
//   TextField,
//   Button,
//   Grid,
//   Typography,
//   Divider,
//   Paper,
//   Container,
//   Box,
//   InputAdornment,
//   IconButton,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import "../css/EditCourse.css";
//
// function EditCourse() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCourse, setSelectedCourse] = useState("");
//
//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };
//
//   const handleCourseSelect = async () => {
//     try {
//       const response = await axios.get(`http://localhost:3001/courses/view/${searchQuery}`);
//       setSelectedCourse(response.data);
//     } catch (error) {
//       console.error("Error fetching course details:", error);
//       alert("Course not found");
//     }
//   };
//
//   const handleSaveChanges = async () => {
//     try {
//       const payload = {
//         courseName: selectedCourse.course.course_name,
//         startDate: selectedCourse.course.start_date,
//         endDate: selectedCourse.course.end_date,
//         groupName: selectedCourse.course.group_name,
//         numberOfStudents: selectedCourse.course.number_of_students,
//         schedule: selectedCourse.schedule,
//       };
//       await axios.put(
//           `http://localhost:3001/courses/update/${selectedCourse.course.id}`,
//           payload
//       );
//       alert("Changes saved successfully!");
//     } catch (error) {
//       console.error("Error saving changes:", error);
//       alert("Error saving changes!");
//     }
//   };
//
//   return (
//       <Container maxWidth="md">
//         <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
//           <Typography variant="h4" gutterBottom>
//             Edit Course
//           </Typography>
//           <TextField
//               label="Search Courses"
//               variant="outlined"
//               value={searchQuery}
//               onChange={handleSearchChange}
//               fullWidth
//               InputProps={{
//                 endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton onClick={handleCourseSelect}>
//                         <SearchIcon />
//                       </IconButton>
//                     </InputAdornment>
//                 ),
//               }}
//               sx={{ marginBottom: 2 }}
//           />
//
//           {selectedCourse && (
//               <Box sx={{ padding: 2 }}>
//                 <Divider sx={{ margin: "20px 0" }} />
//                 <Typography variant="h5" gutterBottom>
//                   Editing Course: {selectedCourse.course.course_name}
//                 </Typography>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                         label="Course Name"
//                         variant="outlined"
//                         fullWidth
//                         value={selectedCourse.course.course_name}
//                         onChange={(e) =>
//                             setSelectedCourse({
//                               ...selectedCourse,
//                               course: {
//                                 ...selectedCourse.course,
//                                 course_name: e.target.value,
//                               },
//                             })
//                         }
//                         sx={{ marginBottom: 2 }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                         label="Class ID"
//                         variant="outlined"
//                         fullWidth
//                         value={selectedCourse.course.classId}
//                         onChange={(e) =>
//                             setSelectedCourse({
//                               ...selectedCourse,
//                               course: {
//                                 ...selectedCourse.course,
//                                 classId: e.target.value,
//                               },
//                             })
//                         }
//                         sx={{ marginBottom: 2 }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                         label="Start Date"
//                         type="date"
//                         variant="outlined"
//                         fullWidth
//                         value={selectedCourse.course.start_date}
//                         onChange={(e) =>
//                             setSelectedCourse({
//                               ...selectedCourse,
//                               course: {
//                                 ...selectedCourse.course,
//                                 start_date: e.target.value,
//                               },
//                             })
//                         }
//                         InputLabelProps={{
//                           shrink: true,
//                         }}
//                         sx={{ marginBottom: 2 }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                         label="End Date"
//                         type="date"
//                         variant="outlined"
//                         fullWidth
//                         value={selectedCourse.course.end_date}
//                         onChange={(e) =>
//                             setSelectedCourse({
//                               ...selectedCourse,
//                               course: {
//                                 ...selectedCourse.course,
//                                 end_date: e.target.value,
//                               },
//                             })
//                         }
//                         InputLabelProps={{
//                           shrink: true,
//                         }}
//                         sx={{ marginBottom: 2 }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                         label="Number of Students"
//                         type="number"
//                         variant="outlined"
//                         fullWidth
//                         value={selectedCourse.course.number_of_students}
//                         onChange={(e) =>
//                             setSelectedCourse({
//                               ...selectedCourse,
//                               course: {
//                                 ...selectedCourse.course,
//                                 number_of_students: parseInt(e.target.value),
//                               },
//                             })
//                         }
//                         sx={{ marginBottom: 2 }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
//                       <InputLabel id="group-label">Group</InputLabel>
//                       <Select
//                           labelId="group-label"
//                           value={selectedCourse.course.group_name}
//                           onChange={(e) =>
//                               setSelectedCourse({
//                                 ...selectedCourse,
//                                 course: {
//                                   ...selectedCourse.course,
//                                   group_name: e.target.value,
//                                 },
//                               })
//                           }
//                           label="Group"
//                       >
//                         <MenuItem value="North">North</MenuItem>
//                         <MenuItem value="South">South</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Typography variant="h6" gutterBottom>
//                       Schedule Details
//                     </Typography>
//                   </Grid>
//                   {selectedCourse.schedule.map((item, index) => (
//                       <Grid container item xs={12} key={index} spacing={2}>
//                         <Grid item xs={2}>
//                           <TextField
//                               label="Date"
//                               variant="outlined"
//                               fullWidth
//                               value={item.date}
//                               onChange={(e) => {
//                                 const updatedSchedule = [...selectedCourse.schedule];
//                                 updatedSchedule[index].date = e.target.value;
//                                 setSelectedCourse({
//                                   ...selectedCourse,
//                                   schedule: updatedSchedule,
//                                 });
//                               }}
//                               sx={{ marginBottom: 2 }}
//                           />
//                         </Grid>
//                         <Grid item xs={3}>
//                           <TextField
//                               label="Day"
//                               variant="outlined"
//                               fullWidth
//                               value={item.weekday}
//                               onChange={(e) => {
//                                 const updatedSchedule = [...selectedCourse.schedule];
//                                 updatedSchedule[index].weekday = e.target.value;
//                                 setSelectedCourse({
//                                   ...selectedCourse,
//                                   schedule: updatedSchedule,
//                                 });
//                               }}
//                               sx={{ marginBottom: 2 }}
//                           />
//                         </Grid>
//                         <Grid item xs={5}>
//                           <TextField
//                               label="Description"
//                               variant="outlined"
//                               fullWidth
//                               value={item.description}
//                               onChange={(e) => {
//                                 const updatedSchedule = [...selectedCourse.schedule];
//                                 updatedSchedule[index].description = e.target.value;
//                                 setSelectedCourse({
//                                   ...selectedCourse,
//                                   schedule: updatedSchedule,
//                                 });
//                               }}
//                               sx={{ marginBottom: 2 }}
//                           />
//                         </Grid>
//                       </Grid>
//                   ))}
//                 </Grid>
//                 <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={handleSaveChanges}
//                     sx={{ marginTop: 2 }}
//                 >
//                   Save Changes
//                 </Button>
//               </Box>
//           )}
//         </Paper>
//       </Container>
//   );
// }
//
// export default EditCourse;

// import React, { useState } from "react";
// import {
//   TextField,
//   Button,
//   Grid,
//   Typography,
//   Divider,
//   Paper,
//   Container,
//   Box,
//   InputAdornment,
//   IconButton,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import "../css/EditCourse.css";
//
// function EditCourse() {
//   // State variable to store course details
//   const [courses, setCourses] = useState([
//     {
//       id: 1,
//       courseName: "Induction",
//       startDate: "2024-01-15",
//       endDate: "2024-01-19",
//       numberOfStudents: 20,
//       classId: "Class 200",
//       group: "North",
//       schedule: [
//         { day: 1, date: "15-01-2024", weekday: "Monday", description: "" },
//         { day: 2, date: "16-01-2024", weekday: "Tuesday", description: "" },
//         { day: 2, date: "17-01-2024", weekday: "Wednesday", description: "" },
//         { day: 2, date: "18-01-2024", weekday: "Thursday", description: "" },
//         { day: 2, date: "19-01-2024", weekday: "Friday", description: "" },
//         // Add more schedule items as needed
//       ],
//     },
//     // Add more courses as needed
//   ]);
//
//   // State variables for search and selected course
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCourse, setSelectedCourse] = useState(null);
//
//   // Function to handle search input change
//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };
//
//   // Function to handle course selection
//   const handleCourseSelect = (course) => {
//     setSelectedCourse(course);
//   };
//
//   // Function to handle saving changes
//   const handleSaveChanges = () => {
//     // Logic to save changes to the selected course
//     console.log("Changes saved:", selectedCourse);
//   };
//
//   return (
//     <Container maxWidth="md">
//       <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
//         <Typography variant="h4" gutterBottom>
//           Edit Course
//         </Typography>
//         {/* Search input for filtering courses */}
//         <TextField
//           label="Search Courses"
//           variant="outlined"
//           value={searchQuery}
//           onChange={handleSearchChange}
//           fullWidth
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton>
//                   <SearchIcon />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//           sx={{ marginBottom: 2 }}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => {
//             const foundCourse = courses.find(
//               (course) =>
//                 course.courseName.toLowerCase() === searchQuery.toLowerCase()
//             );
//             handleCourseSelect(foundCourse);
//           }}
//           fullWidth
//           sx={{ marginBottom: 2 }}
//         >
//           Search
//         </Button>
//
//         {/* Display selected course details for editing */}
//         {selectedCourse && (
//           <Box sx={{ padding: 2 }}>
//             <Divider sx={{ margin: "20px 0" }} />
//             <Typography variant="h5" gutterBottom>
//               Editing Course: {selectedCourse.courseName}
//             </Typography>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Course Name"
//                   variant="outlined"
//                   fullWidth
//                   value={selectedCourse.courseName}
//                   onChange={(e) =>
//                     setSelectedCourse({
//                       ...selectedCourse,
//                       courseName: e.target.value,
//                     })
//                   }
//                   sx={{ marginBottom: 2 }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Class ID"
//                   variant="outlined"
//                   fullWidth
//                   value={selectedCourse.classId}
//                   onChange={(e) =>
//                     setSelectedCourse({
//                       ...selectedCourse,
//                       classId: e.target.value,
//                     })
//                   }
//                   sx={{ marginBottom: 2 }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Start Date"
//                   type="date"
//                   variant="outlined"
//                   fullWidth
//                   value={selectedCourse.startDate}
//                   onChange={(e) =>
//                     setSelectedCourse({
//                       ...selectedCourse,
//                       startDate: e.target.value,
//                     })
//                   }
//                   InputLabelProps={{
//                     shrink: true,
//                   }}
//                   sx={{ marginBottom: 2 }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="End Date"
//                   type="date"
//                   variant="outlined"
//                   fullWidth
//                   value={selectedCourse.endDate}
//                   onChange={(e) =>
//                     setSelectedCourse({
//                       ...selectedCourse,
//                       endDate: e.target.value,
//                     })
//                   }
//                   InputLabelProps={{
//                     shrink: true,
//                   }}
//                   sx={{ marginBottom: 2 }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Number of Students"
//                   type="number"
//                   variant="outlined"
//                   fullWidth
//                   value={selectedCourse.numberOfStudents}
//                   onChange={(e) =>
//                     setSelectedCourse({
//                       ...selectedCourse,
//                       numberOfStudents: parseInt(e.target.value),
//                     })
//                   }
//                   sx={{ marginBottom: 2 }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
//                   <InputLabel id="group-label">Group</InputLabel>
//                   <Select
//                     labelId="group-label"
//                     value={selectedCourse.group}
//                     onChange={(e) =>
//                       setSelectedCourse({
//                         ...selectedCourse,
//                         group: e.target.value,
//                       })
//                     }
//                     label="Group"
//                   >
//                     <MenuItem value="North">North</MenuItem>
//                     <MenuItem value="South">South</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12}>
//                 <Typography variant="h6" gutterBottom>
//                   Schedule Details
//                 </Typography>
//               </Grid>
//               {selectedCourse.schedule.map((item, index) => (
//                 <Grid container item xs={12} key={index} spacing={2}>
//                   {/* <Grid item xs={2}>
//                     <TextField
//                       label="Day Number"
//                       variant="outlined"
//                       fullWidth
//                       value={item.day}
//
//                       sx={{ marginBottom: 2 }}
//                     />
//                   </Grid> */}
//                   <Grid item xs={2}>
//                     <TextField
//                       label="Date"
//                       variant="outlined"
//                       fullWidth
//                       value={item.date}
//
//                       sx={{ marginBottom: 2 }}
//                     />
//                   </Grid>
//                   <Grid item xs={3}>
//                     <TextField
//                       label="Day"
//                       variant="outlined"
//                       fullWidth
//                       value={item.weekday}
//
//                       sx={{ marginBottom: 2 }}
//                     />
//                   </Grid>
//                   <Grid item xs={5}>
//                     <TextField
//                       label="Description"
//                       variant="outlined"
//                       fullWidth
//                       value={item.description}
//                       onChange={(e) => {
//                         const updatedSchedule = [...selectedCourse.schedule];
//                         updatedSchedule[index].description = e.target.value;
//                         setSelectedCourse({
//                           ...selectedCourse,
//                           schedule: updatedSchedule,
//                         });
//                       }}
//                       sx={{ marginBottom: 2 }}
//                     />
//                   </Grid>
//                 </Grid>
//               ))}
//             </Grid>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSaveChanges}
//               sx={{ marginTop: 2 }}
//             >
//               Save Changes
//             </Button>
//           </Box>
//         )}
//       </Paper>
//     </Container>
//   );
// }
//
// export default EditCourse;
