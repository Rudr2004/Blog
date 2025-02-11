//import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { googleLoginRequest, loginRequest } from '../redux/actions/authAction.js';
import { Box, TextField, Button, Typography, Divider } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);

    //Use Formik yup for validation
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Paassword must be at least 6 characters')
                .max(8, 'Password must be at least 8 characters')
                .required('Password is required')
        }),
        onSubmit: (values) => {
            // console.log("values", values)
            dispatch(loginRequest(values));
            navigate("/");
            toast.sucess("Loggedin")
        }
    })

    const googleSignin = async (e) => {
        e.preventDefault();
        dispatch(googleLoginRequest());
    }

    return (
        <Box
            sx={{
                maxWidth: 450,
                margin: '50px auto',
                padding: 4,
                background: 'linear-gradient(45deg, #e0f7fa 30%, #80deea 90%)',
                borderRadius: 2,
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Typography variant="h5" gutterBottom>
                Login
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    label="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    fullWidth
                    margin="normal"
                />
                <p style={{ textAlign: "right", fontSize: "15px" }}>Forgot Password?<Link to="/forgot-password">Click Here</Link></p>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading || formik.isSubmitting}
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    {loading || formik.isSubmitting ? 'Logging in...' : 'Login'}
                </Button>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2, mb: 2 }}>
                    <Divider sx={{ width: '40%', mr: 1 }} />
                    <Typography variant="body2">or</Typography>
                    <Divider sx={{ width: '40%', ml: 1 }} />
                </Box>

                {/** Signin with Google */}
                <Button onClick={googleSignin}
                    variant="contained"
                    color="primary"
                    startIcon={
                        <img
                            src="https://logos-world.net/wp-content/uploads/2020/09/Google-Symbol.png"
                            alt="google"
                            style={{
                                width: 24,
                                height: 24,
                                marginRight: 8,
                            }}
                        />
                    }
                    sx={{
                        width: { xs: '100%', sm: '100%', md: '100%', lg: '100%' },
                        textTransform: 'none',
                        backgroundColor: '#FFFFFF',
                        color: '#4285F4',
                        '&:hover': { backgroundColor: '#F7F7F7' },
                        padding: { xs: '6px 12px', sm: '8px 16px', md: '10px 20px', lg: '12px 24px' },
                        fontSize: { xs: '12px', sm: '14px', md: '16px', lg: '18px' },
                    }}
                >
                    Sign in with Google
                </Button>

                <p style={{ textAlign: "center" }}>Not Registered?<Link to="/register">Register</Link></p>

            </form>
        </Box>
    );
};

export default Login;