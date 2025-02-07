//import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerRequest, googleLoginRequest, gitLoginRequest } from '../redux/actions/authAction.js';
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Divider } from '@mui/material';
import { toast } from "react-hot-toast"
import { useFormik } from 'formik';
import * as Yup from "yup"

const Register = () => {

    const navigate = useNavigate()
    //const [form, setForm] = useState({ username: '', email: '', password: '' });
    const dispatch = useDispatch();
    const { loading, success } = useSelector((state) => state.auth);

    //Use Formik yup for validation
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required').min(2, "Atleast 2 character"),
            email: Yup.string().email('Invalid email').required('Email is required'),
            password: Yup.string().min(6, 'Paassword must be at least 6 characters')
                .max(8, 'Password must be at least 8 characters').required('Password is required')
        }),
        onSubmit: (values) => {
            dispatch(registerRequest(values));
            if (success == true) {
                toast.success("Registered Successfully");
                navigate("/login")
            } else {
                toast.error("Failed to Register")
            }
        }
    })

    const googleSignin = (e) => {
        e.preventDefault();
        dispatch(googleLoginRequest());
        if (success == true) {
            toast.success(" Logged in");
        } else {
            toast.error("Failed to Login")
        }
    }

    const gitsigin = async (e) => {
        e.preventDefault();
        dispatch(gitLoginRequest());
        if (success == true) {
            toast.success("Logged in");
        } else {
            toast.error("Failed to Login")
        }
    }


    return (
        <Box sx={{
            width: { xs: '100%', sm: '80%', md: '60%', lg: '40%', xl: '30%' },
            margin: '50px auto',
            textAlign: 'center',
            background: 'linear-gradient(45deg, #e0f7fa 30%, #80deea 90%)',
            padding: { xs: '10px', sm: '20px', md: '30px', lg: '40px', xl: '50px' },
            borderRadius: '8px'
        }}>
            <Typography variant="h5" gutterBottom>
                Register
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    label="Username"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.name}
                    fullWidth
                    margin="normal"
                    required
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
                    required
                />
                <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth sx={{ mt: 2 }}>
                    {loading ? 'Registering...' : 'Register'}
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

                {/** Signin with Github */}
                <Button onClick={gitsigin}
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "2px" }}
                    startIcon={
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                            alt="github"
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
                    Sign in with Github
                </Button>

            </form>
        </Box>
    );
};

export default Register;