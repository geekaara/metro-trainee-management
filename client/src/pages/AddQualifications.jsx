import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Grid,
    Container,
    Paper,
    Box,
    Typography,
    Button,
    FormControlLabel,
    Checkbox
} from '@mui/material';
import "../css/AddQualifications.css";

export default function AddQualifications() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission
        navigate('/availability');  // Navigate to the next step
    };

    const handleBack = () => {
        navigate('/add-instructors');
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Qualifications
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Please complete the following form.
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={3}>
                        {['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4', 'Phase 5', 'Phase 6'].map((phase, index) => (
                            <Grid container item xs={12} key={index}>
                                <Grid item xs={6}>
                                    <Typography variant="body1">{phase}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControlLabel
                                        control={<Checkbox name={phase} color="primary" />}
                                        label="Status"
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
                                    Next
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
}


// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//     Grid,
//     CssBaseline,
//     Box,
//     Paper,
//     Typography,
//     Button,
//     FormControlLabel,
//     Checkbox
// } from '@mui/material';
// import "../css/AddQualifications.css";
//
// export default function AddQualifications() {
//     const navigate = useNavigate();
//
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         // Handle form submission
//         navigate('/availability');
//     };
//
//     return (
//         <Grid container component="main" className="main-grid">
//             <CssBaseline />
//             <Grid item xs={12} component={Paper} elevation={6} square>
//                 <Box className="paper-grid" sx={{ padding: 4 }}>
//                     <Typography component="h1" variant="h5" style={{ fontWeight: 'bold' }}>
//                         Qualifications
//                     </Typography>
//                     <Typography variant="body1" gutterBottom>
//                         Please complete the following form.
//                     </Typography>
//                     <form noValidate onSubmit={handleSubmit}>
//                         <Grid container spacing={2}>
//                             {['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4', 'Phase 5', 'Phase 6'].map((phase, index) => (
//                                 <Grid item xs={12} key={index}>
//                                     <Grid container spacing={2}>
//                                         <Grid item xs={6}>
//                                             <Typography variant="body1">{phase}</Typography>
//                                         </Grid>
//                                         <Grid item xs={6}>
//                                             <FormControlLabel
//                                                 control={<Checkbox name={phase} color="primary" />}
//                                                 label="Status"
//                                             />
//                                         </Grid>
//                                     </Grid>
//                                 </Grid>
//                             ))}
//                         </Grid>
//                         <Box display="flex" justifyContent="flex-end" sx={{ mt: 3 }}>
//                             <Button type="submit" variant="contained" color="primary">
//                                 Next
//                             </Button>
//                         </Box>
//                     </form>
//                 </Box>
//             </Grid>
//         </Grid>
//     );
// }
