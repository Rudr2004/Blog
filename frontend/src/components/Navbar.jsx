import { AppBar, Toolbar, Button, Typography, Menu, MenuItem, useMediaQuery, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authAction';
import PropTypes from 'prop-types';
import { useState } from 'react';

const Navbar = ({ onAddBlogClick }) => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const [anchorEl, setAnchorEl] = useState(null);

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const menuContent = (
        <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{
                '& .MuiPaper-root': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '& .MuiMenuItem-root': {
                        '&:hover': {
                            backgroundColor: 'primary.dark',
                        },
                    },
                },
            }}
        >
            <MenuItem component={Link} to="/">
                Dashboard
            </MenuItem>
            <MenuItem onClick={onAddBlogClick}>
                Add Blog
            </MenuItem>
            {user ? (
                <MenuItem onClick={handleLogout}>
                    Logout
                </MenuItem>
            ) : (
                <MenuItem component={Link} to="/login">
                    Login
                </MenuItem>
            )}
        </Menu>
    );

    return (
        <>
            <AppBar position="static" sx={{ mb: 4, background: 'linear-gradient(45deg, #3f51b5 30%, #ff4081 90%)' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Blog App
                    </Typography>
                    {isSmallScreen ? (
                        <div>
                            <IconButton color="inherit" onClick={handleMenu}>
                                <MenuIcon />
                            </IconButton>
                            {menuContent}
                        </div>
                    ) : (
                        <div>
                            <Button color="inherit" component={Link} to="/">
                                Dashboard
                            </Button>
                            <Button color="inherit" onClick={onAddBlogClick}>
                                Add Blog
                            </Button>
                            {user ? (
                                <Button color="inherit" onClick={handleLogout}>
                                    Logout
                                </Button>
                            ) : (
                                <Button color="inherit" component={Link} to="/login">
                                    Login
                                </Button>
                            )}
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </>
    );
};

Navbar.propTypes = {
    onAddBlogClick: PropTypes.func.isRequired, // Validate the onAddBlogClick prop
};

export default Navbar;