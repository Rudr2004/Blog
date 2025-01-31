import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../redux/actions/authAction.js';
import { Box, TextField, Button, Typography } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginRequest(form));
        navigate("/");
    };

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
                    label="Password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </Button>
                <p style={{ textAlign: "center" }}>Not Registered?<Link to="/register">Register</Link></p>
                <p style={{ textAlign: "center" }}>Forgot Password?<Link to="/forgot-password">Click Here</Link></p>
            </form>
        </Box>
    );
};

export default Login;