import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [loginSuccess, setLoginSuccess] = useState(false);

    const validate = (data) => {
        let errors = {};
        const emailRegex = /^[a-zA-Z0-9._%+-]+@metrotrains\.com\.au$/;

        if (!data.get('email')) {
            errors.email = "Email address is required";
        } else if (!emailRegex.test(data.get('email').trim())) {
            errors.email = "Email address is invalid";
        }

        if (!data.get('password')) {
            errors.password = "Password is required";
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
                const response = await axios.post('http://localhost:3001/users/login', userDetails);
                console.log('Login successful:', response.data);
                navigate('/dashboard');
                setLoginSuccess(true);
                toast.success("Logged in successfully!", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } catch (error) {
                console.error('Failed to login:', error);
                toast.error("Failed to login. Please try again.", {
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
                    <div className="symbol-background"></div>
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
                            autoComplete="current-password"
                            error={!!errors.password}
                            helperText={errors.password}
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
                                <Link href="/signup" variant="body2">
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


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import {
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
// } from '@mui/material';
// import "../css/LoginPage.css";
//
// export default function LoginPage() {
//     const navigate = useNavigate();
//     const [errors, setErrors] = useState({});
//     const [loginSuccess, setLoginSuccess] = useState(false);
//
//     const validate = (data) => {
//         let errors = {};
//         const emailRegex = /^[a-zA-Z0-9._%+-]+@metrotrains\.com\.au$/;
//
//         if (!data.get('email')) {
//             errors.email = "Email address is required";
//         } else if (!emailRegex.test(data.get('email').trim())) {
//             errors.email = "Email address is invalid";
//         }
//
//         if (!data.get('password')) {
//             errors.password = "Password is required";
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
//             });
//             // Perform login logic here
//             navigate('/add-instructors');
//             setLoginSuccess(true);
//             // Show toast notification
//             toast.success("Logged in successfully!", {
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
//                     <div className="symbol-background"></div>
//                     <Typography component="h1" variant="h5" style={{ fontWeight: 'bold' }}>
//                         Sign in
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
//                             autoComplete="current-password"
//                             error={!!errors.password}
//                             helperText={errors.password}
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
//                             sx={{ mt: 3, mb: 2 }}
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
//                                 <Link href="/signup" variant="body2">
//                                     {"Don't have an account? Sign Up"}
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
// import { useNavigate } from 'react-router-dom';  // Import useNavigate
// import {
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
// } from '@mui/material';
// import "../css/LoginPage.css";

// export default function LoginPage() {
//     const navigate = useNavigate();  // Create a navigate function

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const data = new FormData(event.currentTarget);
//         console.log({
//             email: data.get('email'),
//             password: data.get('password'),
//         });
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
//                     {/* Avatar and TrainIcon component are commented out
//                     <Avatar className="avatar">
//                         <TrainIcon />
//                     </Avatar>
//                     */}
//                     <Typography component="h1" variant="h5" style={{ fontWeight: 'bold' }}>
//                         Sign in
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
//                             sx={{ mt: 3, mb: 2 }}
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
//                                 <Link href="/signup" variant="body2">
//                                     {"Don't have an account? Sign Up"}
//                                 </Link>
//                             </Grid>
//                         </Grid>
//                     </Box>
//                 </Box>
//             </Grid>
//         </Grid>
//     );
// }


// import React from 'react';
// import { useNavigate } from 'react-router-dom';  // Import useNavigate
// import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
// import Paper from '@material-ui/core/Paper';
// import Box from '@material-ui/core/Box';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
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


// import React from 'react';
// // import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import "../css/LoginPage.css";
// // import TrainIcon from '@material-ui/icons/TrainOutlined';  // Assuming TrainIcon is correctly installed
//
// export default function LoginPage() {
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const data = new FormData(event.currentTarget);
//         console.log({
//             email: data.get('email'),
//             password: data.get('password'),
//         });
//     };
//
//     return (
//         <Grid container component="main">
//             <CssBaseline />
//             <Grid item xs={false} sm={4} md={7} style={{ background: 'url(path_to_your_image.jpg)', backgroundSize: 'cover' }} />
//             <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//                 <Box style={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     margin: '64px 32px',
//                     width: 'auto',
//                 }}>
//                     {/*<Avatar style={{*/}
//                     {/*    margin: '8px',*/}
//                     {/*    backgroundColor: 'secondary.main',*/}
//                     {/*}}>*/}
//                     {/*    <TrainIcon />*/}
//                     {/*</Avatar>*/}
//                     <Typography component="h1" variant="h5">
//                         Sign in
//                     </Typography>
//                     <form noValidate onSubmit={handleSubmit} style={{
//                         width: '100%',
//                         marginTop: '8px',
//                     }}>
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
//                             style={{
//                                 marginTop: '24px',
//                                 marginBottom: '16px',
//                                 padding: '15px 200px',
//                                 borderRadius: '80px',
//                             }}
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
