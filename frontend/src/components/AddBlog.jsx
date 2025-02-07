import { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Grid, Paper, Snackbar, Modal } from '@mui/material';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';


const AddBlog = ({ onBlogAdded, open, handleClose }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [desc, setDesc] = useState('');
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                setModalOpen(true);
            }, 300); // Delay for slow-motion effect
            return () => clearTimeout(timer);
        } else {
            setModalOpen(false);
        }
    }, [open]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !desc) {
            setError('Title and Description are required');
            return;
        }

        try {
            const token = localStorage.getItem('token'); // Retrieve the token from local storage
            const token1 = localStorage.getItem("Googletoken");
            if (token || token1) {
                const response = await axios.post('http://localhost:4000/api/blog/create', {
                    title,
                    content,
                    desc,
                }, {
                    headers: { Authorization: `Bearer ${token}` } // Include the token in the headers
                });
                setTitle('');
                setContent('');
                setDesc('');
                toast.success("Blog Added Successfully");
                if (onBlogAdded) onBlogAdded(response.data);
                handleClose();
            }

        }
        catch (error) {
            toast.error("Failed to upload blog");
            console.error("Error creating blog:", error);
        }

    };

    return (
        <Modal open={modalOpen} onClose={handleClose}>
            <Paper sx={{
                width: { xs: '90%', sm: '400px' },
                margin: '50px auto',
                padding: '20px',
                borderRadius: '8px',
                backgroundColor: '#f5f5f5',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease-in-out',
                transform: modalOpen ? 'scale(1)' : 'scale(0.9)',
                opacity: modalOpen ? 1 : 0
            }}>
                <Typography variant="h4" gutterBottom color="primary">
                    Add a New Blog
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Title"
                                variant="outlined"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                margin="normal"
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                variant="outlined"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                margin="normal"
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="secondary" fullWidth>
                                Add Blog
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Snackbar
                    open={!!error}
                    autoHideDuration={6000}
                    onClose={() => setError('')}
                    message={error}
                />
            </Paper>
        </Modal>
    );
};

AddBlog.propTypes = {
    onBlogAdded: PropTypes.func,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default AddBlog;
