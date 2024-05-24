import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Grid,
    CssBaseline,
    Box,
    Paper,
    Typography,
    Button,
    Link,
    TextField
} from '@mui/material';
import "../css/SignupPage.css";
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css';

export default function SignupPage() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const validate = (data) => {
        let errors = {};
        const emailRegex = /^[a-zA-Z0-9._%+-]+@metrotrains\.com\.au$/;

        // Validate email
        if (!data.get('email')) {
            errors.email = "Email address is required";
        } else if (!/\S+@\S+\.\S+/.test(data.get('email'))) {
            errors.email = "Email address is invalid. Ensure it contains '@' and a domain.";
        } else if (!emailRegex.test(data.get('email').trim())) {
            errors.email = "Email address must be from the domain @metrotrains.com.au";
        }

        // Validate password
        if (!data.get('password')) {
            errors.password = "Password is required";
        } else if (data.get('password').length < 8) {
            errors.password = "Password must be 8 or more characters";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(data.get('password'))) {
            errors.password = "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long";
        }

        // Validate confirm password
        if (!data.get('confirmPassword')) {
            errors.confirmPassword = "Confirm Password is required";
        } else if (data.get('password') !== data.get('confirmPassword')) {
            errors.confirmPassword = "Passwords do not match";
        }

        return errors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const validationErrors = validate(data);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            const userDetails = {
                email: data.get('email'),
                password: data.get('password'),
            };

            try {
                const response = await axios.post('http://localhost:3001/users/register', userDetails);
                console.log('Signup successful:', response.data);
                navigate('/login');
                toast.success("Successfully Registered!!", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } catch (error) {
                console.error('Failed to signup:', error);
                toast.error("Failed to signup. Please try again.", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
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
                    <Typography component="h1" variant="h5" style={{ fontWeight: 'bold' }}>
                        Sign Up
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
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            autoComplete="new-password"
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="submit-button"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/login" variant="body2">
                                    {"Already have an account? Sign In"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//     Grid,
//     CssBaseline,
//     Box,
//     Paper,
//     Typography,
//     Button,
//     Link,
//     TextField
// } from '@mui/material';
// import "../css/SignupPage.css";
// import { toast } from 'react-toastify'; // Import toast from react-toastify
// import 'react-toastify/dist/ReactToastify.css';
//
// export default function SignupPage() {
//     const navigate = useNavigate();
//     const [errors, setErrors] = useState({});
//
//     const validate = (data) => {
//         let errors = {};
//         const emailRegex = /^[a-zA-Z0-9._%+-]+@metrotrains\.com\.au$/;
//
//         // Validate email
//         if (!data.get('email')) {
//             errors.email = "Email address is required";
//         } else if (!/\S+@\S+\.\S+/.test(data.get('email'))) {
//             errors.email = "Email address is invalid. Ensure it contains '@' and a domain.";
//         } else if (!emailRegex.test(data.get('email').trim())) {
//             errors.email = "Email address must be from the domain @metrotrains.com.au";
//         }
//
//         // Validate password
//         if (!data.get('password')) {
//             errors.password = "Password is required";
//         } else if (data.get('password').length < 8) {
//             errors.password = "Password must be 8 or more characters";
//         } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(data.get('password'))) {
//             errors.password = "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long";
//         }
//
//         // Validate confirm password
//         if (!data.get('confirmPassword')) {
//             errors.confirmPassword = "Confirm Password is required";
//         } else if (data.get('password') !== data.get('confirmPassword')) {
//             errors.confirmPassword = "Passwords do not match";
//         }
//
//         return errors;
//     };
//
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const data = new FormData(event.currentTarget);
//         const validationErrors = validate(data);
//         setErrors(validationErrors);
//
//         if (Object.keys(validationErrors).length === 0) {
//             console.log({
//                 email: data.get('email'),
//                 password: data.get('password'),
//                 confirmPassword: data.get('confirmPassword'),
//             });
//             // Perform signup logic here
//             navigate('/');
//             toast.success("Successfully Registered!!", {
//                 position: "top-center",
//                 autoClose: 3000,
//                 hideProgressBar: true,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//               });
//         }
//     };
//
//     return (
//         <Grid container component="main" className="main-grid">
//             <CssBaseline />
//             <Grid item xs={false} sm={4} md={7} className="image-grid" />
//             <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//                 <Box className="paper-grid" sx={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     minHeight: '100vh',
//                     padding: 4
//                 }}>
//                     <div className="symbol-background"></div> {/* Background for symbol.png */}
//                     <Typography component="h1" variant="h5" style={{ fontWeight: 'bold' }}>
//                         Sign Up
//                     </Typography>
//                     <Box component="form" noValidate onSubmit={handleSubmit} className="form" sx={{ mt: 1 }}>
//                         <TextField
//                             margin="normal"
//                             required
//                             fullWidth
//                             id="email"
//                             label="Email Address"
//                             name="email"
//                             autoComplete="email"
//                             autoFocus
//                             error={!!errors.email}
//                             helperText={errors.email}
//                         />
//                         <TextField
//                             margin="normal"
//                             required
//                             fullWidth
//                             name="password"
//                             label="Password"
//                             type="password"
//                             id="password"
//                             autoComplete="new-password"
//                             error={!!errors.password}
//                             helperText={errors.password}
//                         />
//                         <TextField
//                             margin="normal"
//                             required
//                             fullWidth
//                             name="confirmPassword"
//                             label="Confirm Password"
//                             type="password"
//                             id="confirmPassword"
//                             autoComplete="new-password"
//                             error={!!errors.confirmPassword}
//                             helperText={errors.confirmPassword}
//                         />
//                         <Button
//                             type="submit"
//                             fullWidth
//                             variant="contained"
//                             color="primary"
//                             className="submit-button"
//                             sx={{ mt: 3, mb: 2 }}
//                         >
//                             Sign Up
//                         </Button>
//                         <Grid container>
//                             <Grid item xs>
//                                 <Link href="/" variant="body2">
//                                     {"Already have an account? Sign In"}
//                                 </Link>
//                             </Grid>
//                         </Grid>
//                     </Box>
//                 </Box>
//             </Grid>
//         </Grid>
//     );
// }
//



// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//     Grid,
//     CssBaseline,
//     Box,
//     Paper,
//     Typography,
//     Button,
//     Link,
//     TextField
// } from '@mui/material';
// import "../css/SignupPage.css";


// export default function SignupPage() {
//     const navigate = useNavigate();

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const data = new FormData(event.currentTarget);
//         console.log({
//             email: data.get('email'),
//             password: data.get('password'),
//             confirmPassword: data.get('confirmPassword'),
//         });
//         // Perform signup logic here
//         navigate('/dashboard');
//     };

//     return (
//         <Grid container component="main" className="main-grid">
//             <CssBaseline />
//             <Grid item xs={false} sm={4} md={7} className="image-grid" />
//             <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//                 <Box className="paper-grid" sx={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     minHeight: '100vh',
//                     padding: 4
//                 }}>
//                     <div className="symbol-background"></div> {/* Background for symbol.png */}
//                     <Typography component="h1" variant="h5" style={{ fontWeight: 'bold' }}>
//                         Sign Up
//                     </Typography>
//                     <Box component="form" noValidate onSubmit={handleSubmit} className="form" sx={{ mt: 1 }}>
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
//                             autoComplete="new-password"
//                         />
//                         <TextField
//                             margin="normal"
//                             required
//                             fullWidth
//                             name="confirmPassword"
//                             label="Confirm Password"
//                             type="password"
//                             id="confirmPassword"
//                             autoComplete="new-password"
//                         />
//                         <Button
//                             type="submit"
//                             fullWidth
//                             variant="contained"
//                             color="primary"
//                             className="submit-button"
//                             sx={{ mt: 3, mb: 2 }}
//                         >
//                             Sign Up
//                         </Button>
//                         <Grid container>
//                             <Grid item xs>
//                                 <Link href="/" variant="body2">
//                                     {"Already have an account? Sign In"}
//                                 </Link>
//                             </Grid>
//                         </Grid>
//                     </Box>
//                 </Box>
//             </Grid>
//         </Grid>
//     );
// }
