import React, { useState } from 'react'


import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Paper,
    Stepper,Step,StepLabel
} from '@mui/material';


function BasicDetails({ saveBasicDetails }) {

    const [instructorDetails, setInstructorDetails] = useState({
        title: '',
        firstName: '',
        lastName: '',
        formalName: '',
        gender: '',
        contactNo: '',
        employeeID: '',
        email: ''
    });


   
        
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInstructorDetails({
            ...instructorDetails,
            [name]: value
        });
        saveBasicDetails({ 
            ...instructorDetails,
            [name]: value });

    };
    

   

  return (
    <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Basic Details
                </Typography>
                <form noValidate>
                    <Box sx={{ mt: 2 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel id="title-label">Title</InputLabel>
                                    <Select
                                        labelId="title-label"
                                        id="title"
                                        name="title"
                                        value={instructorDetails.title}
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="Mr">Mr</MenuItem>
                                        <MenuItem value="Mrs">Mrs</MenuItem>
                                        <MenuItem value="Ms">Ms</MenuItem>
                                        <MenuItem value="Dr">Dr</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    required
                                    name="firstName"
                                    label="First Name"
                                    value={instructorDetails.firstName}
                                    onChange={handleInputChange}
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name="lastName"
                                    label="Last Name"
                                    value={instructorDetails.lastName}
                                    onChange={handleInputChange}
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="formalName"
                                    label="Formal Name"
                                    value={instructorDetails.formalName}
                                    onChange={handleInputChange}
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel id="gender-label">Gender</InputLabel>
                                    <Select
                                        labelId="gender-label"
                                        id="gender"
                                        name="gender"
                                        value={instructorDetails.gender}
                                        onChange={handleInputChange}
                                        label="Gender"
                                    >
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                        <MenuItem value="Transgender">Non binary</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                           
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    name="contactNo"
                                    label="Primary Contact No"
                                    value={instructorDetails.contactNo}
                                    onChange={handleInputChange}
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    name="employeeID"
                                    label="Employee ID"
                                    value={instructorDetails.employeeID}
                                    onChange={handleInputChange}
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    name="email"
                                    label="Primary Email"
                                    value={instructorDetails.email}
                                    onChange={handleInputChange}
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                       
                    </Box>
                </form>
            </Paper>
  )
}

export default BasicDetails