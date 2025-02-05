import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerRequest, googleLoginRequest } from '../redux/actions/authAction.js';
//import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Divider } from '@mui/material';

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

    const googleSignin = (e) => {
        e.preventDefault();
        dispatch(googleLoginRequest());
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
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2, mb: 2 }}>
                    <Divider sx={{ width: '40%', mr: 1 }} />
                    <Typography variant="body2">or</Typography>
                    <Divider sx={{ width: '40%', ml: 1 }} />
                </Box>
                <Button onClick={googleSignin}
                    variant="contained"
                    color="primary"
                    startIcon={
                        <img
                            src="https://logos-world.net/wp-content/uploads/2020/09/Google-Symbol.png"
                            alt=""
                            style={{
                                width: 24,
                                height: 24,
                                marginRight: 8,
                            }}
                        />
                    }
                    sx={{
                        width: '100%',
                        textTransform: 'none',
                        backgroundColor: '#FFFFFF',
                        color: '#4285F4',
                        '&:hover': { backgroundColor: '#F7F7F7' },
                    }}
                >
                    Sign in with Google
                </Button>
            </form>
        </Box>
    );
};

export default Register;