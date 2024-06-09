import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Box,
    Typography,
    Grid,
    FormControlLabel,
    Checkbox,
    TextField,
    Button,
    Alert
} from '@mui/material';
import { format, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';
import "../css/AddInstructorAvailability.css";


const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


export default function AddInstructorAvailability({fetchedInstructorDetails,saveAvailabilityDetails}) {
    const [startEndDates, setStartEndDates] = useState({
        startDate:'',
        endDate:''
    
    });
    const [availability, setAvailability] = useState({});
    const [error, setError] = useState('');
    
    useEffect(() => {
        console.log(fetchedInstructorDetails)
     
        setStartEndDates({
            startDate:fetchedInstructorDetails.startDate,
            endDate:fetchedInstructorDetails.endDate
        });

        if (fetchedInstructorDetails && fetchedInstructorDetails.availability) {
            const initialAvailability = {};
            fetchedInstructorDetails.availability.forEach(day => {
                initialAvailability[day] = true;
            });
            setAvailability(initialAvailability);
        }
       

       }, [fetchedInstructorDetails]);
     
      

    const navigate = useNavigate();


    const handleBack = () => {
        navigate('/qualifications');
    };

    const handleAvailabilityChange = (event) => {
        const { name, checked } = event.target;
        setAvailability(prevAvailability => ({
            ...prevAvailability,
            [name]: checked
        }));
        console.log(startEndDates)
        saveAvailabilityDetails({ availability: { ...availability, [name]: checked } },
            startEndDates);
    };

    const handleInputChange =  (event) => {
        const { name, value } = event.target;
        setStartEndDates({
            ...startEndDates,
            [name]: value
        });


        saveAvailabilityDetails(availability,{ 
            ...startEndDates,
        [name]: value });

    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Availability
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Please complete the following form.
                </Typography>
                <Box component="form"  noValidate>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Start Date"
                                type="date"
                                name="startDate"
                                value={startEndDates.startDate}
                                onChange={handleInputChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="End Date"
                                type="date"
                                name="endDate"
                                value={startEndDates.endDate}
                                onChange={handleInputChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                        </Grid>
                      
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Weekly Availability
                            </Typography>
                        </Grid>
                        {dayNames.map((day) => (
                            <Grid key={day} container item xs={12} >
                                <Grid item xs={6}>
                                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                                        {day}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                            checked={availability[day] || false}
                                            onChange={handleAvailabilityChange}
                                            name={day}
                                            />
                                        }
                                        label=""
                                    />
                                </Grid>
                            </Grid>
                        ))}
                       
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
}
