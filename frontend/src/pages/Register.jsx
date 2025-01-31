import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerRequest } from '../redux/actions/authAction.js';
import { Box, TextField, Button, Typography } from '@mui/material';

const Register = () => {
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerRequest(form));
    };

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
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
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
                <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth sx={{ mt: 2 }}>
                    {loading ? 'Registering...' : 'Register'}
                </Button>
            </form>
        </Box>
    );
};

export default Register;