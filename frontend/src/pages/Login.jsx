import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { googleLoginRequest, loginRequest } from '../redux/actions/authAction.js';
import { Box, TextField, Button, Typography, Divider } from '@mui/material';
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
                <p style={{ textAlign: "right", fontSize: "15px" }}>Forgot Password?<Link to="/forgot-password">Click Here</Link></p>
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
                <p style={{ textAlign: "center" }}>Not Registered?<Link to="/register">Register</Link></p>

            </form>
        </Box>
    );
};

export default Login;