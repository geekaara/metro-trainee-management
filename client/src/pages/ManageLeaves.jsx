import React, { useState } from "react";
import {
  TextField,
  Grid,
  Card,
  CardContent,
  Paper,
  Container,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

function ManageLeaves() {
  const [searchQuery, setSearchQuery] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [type, setType] = useState("");
  const [instructorId, setInstructorId] = useState(0);
  const [remarks, setRemarks] = useState("");

  const [leaves, setLeaves] = useState([]);
  const [instructorFound, setInstructorFound] = useState(false);

  
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/leaves/search?query=${searchQuery}`
      );
      
  
      const data = response.data.leaves;
      const searchData = data[0];

      
  
      if (searchData.length > 0) {
        const { employee_name, start_date, end_date,instructorId } = searchData[0];
        const [first_name, last_name] = employee_name.split(" ");
  
        setFirstName(first_name);
        setLastName(last_name);
        setInstructorFound(true);

        setInstructorId(instructorId);

      } else {
        setFirstName("");
        setLastName("");
        setInstructorFound(false);
      }
  
      const updatedLeaves = searchData.map((leave) => ({
        ...leave,
        start_date: new Date(leave.start_date).toISOString().split('T')[0],
        end_date: new Date(leave.end_date).toISOString().split('T')[0],
      }));

      setLeaves(updatedLeaves);

    } catch (error) {
      console.error("Error searching for employee:", error);
    }
  };
  
  
  

  const handleAddLeave = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post("http://localhost:3001/leaves/create", {
        instructorId: instructorId, 
        startDate,
        endDate,
        type,
        remarks,
      });
      alert("Absence added successfully!");
    } catch (error) {
      console.error("Error adding absence:", error);
      alert("Error adding absence!");
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3, width: 800 }}>
        <Typography variant="h4" gutterBottom>
          Manage Leaves
        </Typography>
        <Box className="container">
          <form noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <TextField
                  variant="outlined"
                  label="Employee Name"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleSearch}>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4} />
              <Grid item xs={12} sm={4}>
                <TextField
                  variant="outlined"
                  label="First Name"
                  size="small"
                  fullWidth
                  value={firstName}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  variant="outlined"
                  label="Last Name"
                  size="small"
                  fullWidth
                  value={lastName}
                  disabled
                />
              </Grid>
            </Grid>
          </form>

          {instructorFound && (
            <Box sx={{ marginTop: "20px" }}>
              <Typography variant="h6" gutterBottom>
                Current Leaves
              </Typography>

              <Box>
                {leaves.map((leave, index) => (
                  <Card sx={{paddingBottom:0}} key={index} variant="outlined">
                    <CardContent sx={{height:100,padding:0,margin:0}}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            variant="outlined"
                            label="Start Date"
                            size="small"
                            fullWidth
                            value={leave.start_date}
                            
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            variant="outlined"
                            label="End Date"
                            size="small"
                            fullWidth
                            value={leave.end_date}
                          
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            variant="outlined"
                            label="Type"
                            size="small"
                            fullWidth
                            value={leave.type}
                            disabled
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                ))}
              </Box>

              <Box sx={{ marginTop: "20px" }}>
                <Typography variant="h6" gutterBottom>
                  Add New Absence
                </Typography>

                <form
                  noValidate
                  onSubmit={handleAddLeave}
                  autoComplete="off"
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        label="Start Date"
                        type="date"
                        size="small"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        label="End Date"
                        type="date"
                        size="small"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl
                        fullWidth
                        variant="outlined"
                        size="small"
                      >
                        <InputLabel>Leave Type</InputLabel>
                        <Select
                          label="Leave Type"
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                        >
                          <MenuItem value="Annual">Annual</MenuItem>
                          <MenuItem value="Sick">Sick</MenuItem>
                          <MenuItem value="CarerLeave">
                            Carers Leave
                          </MenuItem>
                          <MenuItem value="FatigueDay">
                            Fatigue Day
                          </MenuItem>
                          <MenuItem value="ParentalLeave">
                            Parental Leave
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} />
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        label="Remarks"
                        multiline
                        minRows={2}
                        fullWidth
                        size="small"
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={!startDate || !endDate || !type}
                        type="submit"
                      >
                        Add New Absence
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default ManageLeaves;

