//import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordRequest } from '../redux/actions/authAction.js';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { useFormik } from "formik";
import * as Yup from "yup";

const ForgotPassword = () => {
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
            dispatch(resetPasswordRequest(values));
            navigate("/login");
            toast.sucess("Success")
        }
    })

    return (
        <Box sx={{ width: { xs: '90%', sm: '400px' }, margin: '50px auto', textAlign: 'center', background: 'linear-gradient(45deg, #e0f7fa 30%, #80deea 90%)', padding: '20px', borderRadius: '8px' }}>
            <Typography variant="h5" gutterBottom>
                Reset Your Password
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
                    required
                />
                <TextField
                    label="New Password"
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
                    {loading ? 'Resetting...' : 'Reset'}
                </Button>
            </form>
        </Box>
    );
};

export default ForgotPassword;
