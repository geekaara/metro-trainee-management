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
    Button
} from '@mui/material';
import { format } from 'date-fns';
import "../css/AddInstructorAvailability.css";

const getDayWithSuffix = (date) => {
    const day = format(date, 'd');
    if (day.endsWith('1') && day !== '11') return `${day}st`;
    if (day.endsWith('2') && day !== '12') return `${day}nd`;
    if (day.endsWith('3') && day !== '13') return `${day}rd`;
    return `${day}th`;
};

const formatDate = (date) => {
    return `${getDayWithSuffix(date)} ${format(date, 'MMMM, yyyy')}`;
};

export default function AddInstructorAvailability() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [availableDays, setAvailableDays] = useState([]);
    const [availability, setAvailability] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            let days = [];
            let currentDate = start;

            while (currentDate <= end) {
                days.push({
                    date: formatDate(currentDate),
                    dayName: dayNames[currentDate.getDay()],
                    isoDate: currentDate.toISOString().split('T')[0], // Store ISO date for state management
                });
                currentDate.setDate(currentDate.getDate() + 1);
            }

            setAvailableDays(days);
            const initialAvailability = days.reduce((acc, day) => ({ ...acc, [day.isoDate]: false }), {});
            setAvailability(initialAvailability);
        } else {
            setAvailableDays([]);
            setAvailability({});
        }
    }, [startDate, endDate]);

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
                    Instructor Availability
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Please select your availability below.
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Start Date"
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
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
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
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
                        {availableDays.map((day) => (
                            <Grid container item xs={12} key={day.isoDate}>
                                <Grid item xs={6}>
                                    <Typography variant="body1" style={{ fontWeight: 'bold', fontSize:'17px' }}>
                                        {day.dayName}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2" style={{ fontWeight: 'bold', fontSize:'16px' }}>
                                        {day.date}
                                    </Typography>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={availability[day.isoDate]}
                                                onChange={handleCheckboxChange}
                                                name={day.isoDate}
                                            />
                                        }
                                        label=""
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


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//     Container,
//     Paper,
//     Box,
//     Typography,
//     TextField,
//     Grid,
//     FormControlLabel,
//     Checkbox,
//     Button
// } from '@mui/material';
// import "../css/AddInstructorAvailability.css";
//
// export default function AddInstructorAvailability() {
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');
//     const [availability, setAvailability] = useState({
//         Monday: false,
//         Tuesday: false,
//         Wednesday: false,
//         Thursday: false,
//         Friday: false,
//         Saturday: false,
//         Sunday: false,
//     });
//
//     const navigate = useNavigate();
//
//     const handleCheckboxChange = (event) => {
//         setAvailability({
//             ...availability,
//             [event.target.name]: event.target.checked,
//         });
//     };
//
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         // Handle form submission
//         console.log({ startDate, endDate, availability });
//     };
//
//     const handleBack = () => {
//         navigate('/qualifications');
//     };
//
//     return (
//         <Container maxWidth="md">
//             <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
//                 <Typography variant="h4" gutterBottom>
//                     Availability
//                 </Typography>
//                 <Typography variant="body1" gutterBottom>
//                     Please complete the following form.
//                 </Typography>
//                 <Box component="form" onSubmit={handleSubmit} noValidate>
//                     <Grid container spacing={3}>
//                         <Grid item xs={12} sm={6}>
//                             <TextField
//                                 label="Start Date"
//                                 placeholder="MM/DD/YYYY"
//                                 value={startDate}
//                                 onChange={(e) => setStartDate(e.target.value)}
//                                 fullWidth
//                             />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField
//                                 label="End Date"
//                                 placeholder="MM/DD/YYYY"
//                                 value={endDate}
//                                 onChange={(e) => setEndDate(e.target.value)}
//                                 fullWidth
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <Typography variant="h6" gutterBottom>
//                                 Weekly Availability
//                             </Typography>
//                         </Grid>
//                         {Object.keys(availability).map((day) => (
//                             <Grid container item xs={12} key={day}>
//                                 <Grid item xs={6}>
//                                     <Typography variant="body1">{day}</Typography>
//                                 </Grid>
//                                 <Grid item xs={6}>
//                                     <FormControlLabel
//                                         control={
//                                             <Checkbox
//                                                 checked={availability[day]}
//                                                 onChange={handleCheckboxChange}
//                                                 name={day}
//                                             />
//                                         }
//                                         label="Availability"
//                                     />
//                                 </Grid>
//                             </Grid>
//                         ))}
//                         <Grid item xs={12}>
//                             <Box display="flex" justifyContent="space-between">
//                                 <Button variant="contained" color="secondary" onClick={handleBack}>
//                                     Back
//                                 </Button>
//                                 <Button type="submit" variant="contained" color="primary">
//                                     Submit
//                                 </Button>
//                             </Box>
//                         </Grid>
//                     </Grid>
//                 </Box>
//             </Paper>
//         </Container>
//     );
// }
