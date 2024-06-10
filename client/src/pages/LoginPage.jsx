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
import useAuth from '../services/AuthService';

export default function LoginPage() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [loginSuccess, setLoginSuccess] = useState(false);

    const { login } = useAuth();

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
                const response = await login(userDetails); 
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

