import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import {
    Grid,
    CssBaseline,
    Box,
    Paper,
    Typography,
    Button,
    Link,
    TextField,
    FormControlLabel,
    Checkbox
} from '@mui/material';
import "../css/LoginPage.css";

export default function LoginPage() {
    const navigate = useNavigate();  // Create a navigate function

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
        navigate('/dashboard');
    };

    return (
        <Grid container component="main" className="main-grid">
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className="image-grid" />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box className="paper-grid" sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    padding: 4
                }}>
                    <div className="symbol-background"></div> {/* Background for symbol.png */}
                    {/* Avatar and TrainIcon component are commented out
                    <Avatar className="avatar">
                        <TrainIcon />
                    </Avatar>
                    */}
                    <Typography component="h1" variant="h5" style={{ fontWeight: 'bold' }}>
                        Sign in
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} className="form" sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="submit-button"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}



// import React from 'react';
// import { useNavigate } from 'react-router-dom';  // Import useNavigate
//
// import {
//
//     Grid,
//     CssBaseline,
//     Box,
//     Paper,
//     Typography,
//     Button,
//     Link,
//     TextField,
//     FormControlLabel,
//     Checkbox
//
//  } from '@mui/material';
//
// import "../css/LoginPage.css";
//
// export default function LoginPage() {
//     const navigate = useNavigate();  // Create a navigate function
//
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const data = new FormData(event.currentTarget);
//         console.log({
//             email: data.get('email'),
//             password: data.get('password'),
//         });
//         navigate('/dashboard');
//     };
//
//     return (
//         <Grid container component="main" className="main-grid">
//             <CssBaseline />
//             <Grid item xs={false} sm={4} md={7} className="image-grid" />
//             <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//                 <Box className="paper-grid">
//                 <div className="symbol-background"></div> {/* Background for symbol.png */}
//                     {/* Avatar and TrainIcon component are commented out
//                     <Avatar className="avatar">
//                         <TrainIcon />
//                     </Avatar>
//                     */}
//                     <Typography component="h1" variant="h5" style={{ fontWeight: 'bold' }}>
//                         Sign in
//                     </Typography>
//                     <form noValidate onSubmit={handleSubmit} className="form">
//                         <TextField
//                             margin="normal"
//                             required
//                             fullWidth
//                             id="email"
//                             label="Email Address"
//                             name="email"
//                             autoComplete="email"
//                             autoFocus
//                         />
//                         <TextField
//                             margin="normal"
//                             required
//                             fullWidth
//                             name="password"
//                             label="Password"
//                             type="password"
//                             id="password"
//                             autoComplete="current-password"
//                         />
//                         <FormControlLabel
//                             control={<Checkbox value="remember" color="primary" />}
//                             label="Remember me"
//                         />
//                         <Button
//                             type="submit"
//                             fullWidth
//                             variant="contained"
//                             color="primary"
//                             className="submit-button"
//                         >
//                             Sign In
//                         </Button>
//                         <Grid container>
//                             <Grid item xs>
//                                 <Link href="#" variant="body2">
//                                     Forgot password?
//                                 </Link>
//                             </Grid>
//                             <Grid item>
//                                 <Link href="#" variant="body2">
//                                     Don't have an account? Sign Up
//                                 </Link>
//                             </Grid>
//                         </Grid>
//                     </form>
//                 </Box>
//             </Grid>
//         </Grid>
//     );
// }
