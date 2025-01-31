import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordRequest } from '../redux/actions/authAction.js';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPasswordRequest(form));
        toast.success("Password reset request sent!"); // Success toast
        navigate("/login");
    };

    return (
        <Box sx={{ width: { xs: '90%', sm: '400px' }, margin: '50px auto', textAlign: 'center', background: 'linear-gradient(45deg, #e0f7fa 30%, #80deea 90%)', padding: '20px', borderRadius: '8px' }}>
            <Typography variant="h5" gutterBottom>
                Reset Your Password
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="New Password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
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
