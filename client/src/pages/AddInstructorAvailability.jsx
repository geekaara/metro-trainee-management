import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Box,
    Typography,
    TextField,
    Grid,
    FormControlLabel,
    Checkbox,
    Button
} from '@mui/material';
import "../css/AddInstructorAvailability.css";

export default function AddInstructorAvailability() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [availability, setAvailability] = useState({
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false,
    });

    const navigate = useNavigate();

    const handleCheckboxChange = (event) => {
        setAvailability({
            ...availability,
            [event.target.name]: event.target.checked,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission
        console.log({ startDate, endDate, availability });
    };

    const handleBack = () => {
        navigate('/qualifications');
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
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Start Date"
                                placeholder="MM/DD/YYYY"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="End Date"
                                placeholder="MM/DD/YYYY"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Weekly Availability
                            </Typography>
                        </Grid>
                        {Object.keys(availability).map((day) => (
                            <Grid container item xs={12} key={day}>
                                <Grid item xs={6}>
                                    <Typography variant="body1">{day}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={availability[day]}
                                                onChange={handleCheckboxChange}
                                                name={day}
                                            />
                                        }
                                        label="Availability"
                                    />
                                </Grid>
                            </Grid>
                        ))}
                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="space-between">
                                <Button variant="contained" color="secondary" onClick={handleBack}>
                                    Back
                                </Button>
                                <Button type="submit" variant="contained" color="primary">
                                    Submit
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
}
