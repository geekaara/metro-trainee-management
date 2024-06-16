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
    TextField
} from '@mui/material';
import "../css/AddInstructorAvailability.css";

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function AddInstructorAvailability({
    fetchedInstructorDetails = { availability: [], startDate: '', endDate: '' },
    saveAvailabilityDetails
}) {
    // State for start and end dates
    const [startEndDates, setStartEndDates] = useState({
        startDate: fetchedInstructorDetails.startDate || '',
        endDate: fetchedInstructorDetails.endDate || ''
    });
    // State for availability
    const [availability, setAvailability] = useState({});
    
    useEffect(() => {
        if (fetchedInstructorDetails && fetchedInstructorDetails.availability) {
            const initialAvailability = {};
            fetchedInstructorDetails.availability.forEach(day => {
                initialAvailability[day] = true;
            });
            setAvailability(initialAvailability);
        }
    }, [fetchedInstructorDetails]);

    const navigate = useNavigate();
 // Handle availability change
    const handleAvailabilityChange = (event) => {
        const { name, checked } = event.target;
        setAvailability(prevAvailability => ({
            ...prevAvailability,
            [name]: checked
        }));
        saveAvailabilityDetails({ availability: { ...availability, [name]: checked } }, startEndDates);
    };
// Handle input change for start and end dates
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setStartEndDates(prevDates => ({
            ...prevDates,
            [name]: value
        }));
        saveAvailabilityDetails(availability, { ...startEndDates, [name]: value });
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
                <Box component="form" noValidate>
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
                            <Grid key={day} container item xs={12}>
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
                                                inputProps={{ 'aria-label': day }}
                                            />
                                        }
                                        label={day}
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
