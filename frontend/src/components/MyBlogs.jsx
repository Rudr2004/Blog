import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Card, CardContent, Typography, Box, Button, List, ListItem, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { fetchMyBlogsRequest } from '../redux/actions/blogAction.js';

const MyBlogs = () => {
    const [comments, setComments] = useState({});
    const [openCommentDialog, setOpenCommentDialog] = useState(false);
    const [currentBlogId, setCurrentBlogId] = useState('');
    const [newComment, setNewComment] = useState('');
    const [expandedComments, setExpandedComments] = useState({});

    const dispatch = useDispatch();
    const { blogs, loading, error } = useSelector((state) => state.blog);
    const user = useSelector((state) => state.auth.user); // Get the current user

    useEffect(() => {
        console.log("Current user object:", user); // Log the user object
        if (user) {
            dispatch(fetchMyBlogsRequest(user._id)); // Dispatch with user ID
        }

        // Load comments from local storage
        const storedComments = JSON.parse(localStorage.getItem('comments')) || {};
        setComments(storedComments);
    }, [dispatch, user]);

    const handleCommentSubmit = async () => {
        if (newComment) {
            const updatedComments = {
                ...comments,
                [currentBlogId]: [...(comments[currentBlogId] || []), newComment]
            };
            setComments(updatedComments);
            localStorage.setItem('comments', JSON.stringify(updatedComments)); // Save to local storage
            setNewComment('');
            setOpenCommentDialog(false);
        }
    };

    const loadMoreComments = (blogId) => {
        setExpandedComments((prev) => ({ ...prev, [blogId]: true }));
    };

    return (
        <Box sx={{ padding: 2 }}>
            {loading && <Typography variant="h6">Loading...</Typography>}
            {error && <Typography color="error" variant="h6">{error}</Typography>}
            <Grid container spacing={3}>
                {blogs.map((blog) => (
                    <Grid item xs={12} sm={6} md={4} key={blog._id}>
                        <Card sx={{ padding: 2, height: '300px', overflow: 'hidden', transition: '0.3s', '&:hover': { boxShadow: 6, transform: 'scale(1.02)', backgroundColor: '#E0F2F7' } }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{blog.title}</Typography>
                                <Typography variant="body2" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                    {typeof blog.desc === 'string' ? blog.desc : "No content available"}
                                </Typography>
                                <Button onClick={() => {
                                    setCurrentBlogId(blog._id);
                                    setOpenCommentDialog(true);
                                }}>Add Comment</Button>
                                <Box sx={{ marginTop: 1, padding: 1, backgroundColor: '#f0f0f0', borderRadius: 1 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Comments:</Typography>
                                    <List>
                                        {comments[blog._id] && comments[blog._id].slice(0, 1).map((comment, index) => (
                                            <ListItem key={index}>
                                                <Typography variant="body2">{comment}</Typography>
                                            </ListItem>
                                        ))}
                                        {comments[blog._id] && comments[blog._id].length > 1 && !expandedComments[blog._id] && (
                                            <ListItem>
                                                <Button onClick={() => loadMoreComments(blog._id)}>Show More</Button>
                                            </ListItem>
                                        )}
                                        {expandedComments[blog._id] && comments[blog._id].slice(1).map((comment, index) => (
                                            <ListItem key={index}>
                                                <Typography variant="body2">{comment}</Typography>
                                            </ListItem>
                                        ))}
                                    </List>
                                    <Typography variant="body2" color="warning.main" sx={{ marginTop: 1 }}>
                                        Please add your comments only, not others.
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={openCommentDialog} onClose={() => setOpenCommentDialog(false)}>
                <DialogTitle>Add a Comment</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Comment"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenCommentDialog(false)}>Cancel</Button>
                    <Button onClick={handleCommentSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default MyBlogs;
