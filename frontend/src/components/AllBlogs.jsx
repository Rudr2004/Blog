import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Card, CardContent, Typography, Box, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, List, ListItem, Pagination } from '@mui/material';
import { fetchAllBlogsRequest } from '../redux/actions/blogAction.js';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import theme from '../theme.js';

const AllBlogs = () => {
    const [likes, setLikes] = useState({});
    const [comments, setComments] = useState({});
    const [openCommentDialog, setOpenCommentDialog] = useState(false);
    const [currentBlogId, setCurrentBlogId] = useState('');
    const [newComment, setNewComment] = useState('');
    const [expandedComments, setExpandedComments] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 6; // Number of blogs to display

    const dispatch = useDispatch();
    const { blogs, loading, error } = useSelector((state) => state.allBlogs);

    useEffect(() => {
        dispatch(fetchAllBlogsRequest({ page: currentPage, limit: blogsPerPage }));
    }, [dispatch, currentPage]);

    useEffect(() => {
        const storedLikes = JSON.parse(localStorage.getItem('likes')) || {};
        const storedComments = JSON.parse(localStorage.getItem('comments')) || {};
        setLikes(storedLikes);
        setComments(storedComments);
    }, []);

    const handleCommentSubmit = () => {
        if (newComment) {
            const updatedComments = {
                ...comments,
                [currentBlogId]: [...(comments[currentBlogId] || []), newComment]
            };
            setComments(updatedComments);
            localStorage.setItem('comments', JSON.stringify(updatedComments));
            setNewComment('');
            setOpenCommentDialog(false);
        }
    };

    const handleLike = (blogId) => {
        const updatedLikes = {
            ...likes,
            [blogId]: (likes[blogId] || 0) + 1
        };
        setLikes(updatedLikes);
        localStorage.setItem('likes', JSON.stringify(updatedLikes));
    };

    const loadMoreComments = (blogId) => {
        setExpandedComments((prev) => ({ ...prev, [blogId]: true }));
    };

    // Calculate the current blogs to display
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    return (
        <Box sx={{ padding: 2 }}>
            {loading && <Typography variant="h6">Loading...</Typography>}
            {error && <Typography color="error" variant="h6">{error}</Typography>}
            <Grid container spacing={3}>
                {Array.isArray(currentBlogs) ? (
                    currentBlogs.map((blog) => {
                        return (
                            <Grid item xs={12} sm={6} md={4} key={blog._id}>
                                <Card sx={{ padding: 2, height: '300px', overflow: 'hidden', transition: '0.3s', '&:hover': { boxShadow: 6, transform: 'scale(1.02)', backgroundColor: '#E0F2F7' } }}>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{blog.title}</Typography>
                                        <Typography variant="body2" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{blog.desc ? blog.desc : "No description available"}</Typography>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                                            <IconButton onClick={() => handleLike(blog._id)}>
                                                <FavoriteIcon />
                                            </IconButton>
                                            <IconButton onClick={() => {
                                                setCurrentBlogId(blog._id);
                                                setOpenCommentDialog(true);
                                            }}>
                                                <CommentIcon />
                                            </IconButton>
                                        </Box>
                                        <Typography variant="body2">Likes: {likes[blog._id] || 0}</Typography>
                                        <Box sx={{
                                            marginTop: 1,
                                            padding: 1,
                                            backgroundColor: '#f0f0f0',
                                            borderRadius: 1,
                                            overflow: 'auto',
                                            maxHeight: '100px',
                                            '&::-webkit-scrollbar': {
                                                width: '8px',
                                                height: '8px',
                                                backgroundColor: '#f0f0f0',
                                                borderRadius: '10px'
                                            },
                                            '&::-webkit-scrollbar-thumb': {
                                                backgroundColor: '#2196f3',
                                                borderRadius: '10px',
                                                boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'
                                            },
                                            '&::-webkit-scrollbar-thumb:hover': {
                                                backgroundColor: '#1a237e'
                                            },
                                            '&::-webkit-scrollbar-track': {
                                                backgroundColor: '#f0f0f0',
                                                borderRadius: '10px',
                                                boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'
                                            },
                                            scrollbarWidth: 'thin',
                                            scrollbarColor: '#2196f3 #f0f0f0'
                                        }}>
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
                                                {expandedComments[blog._id] && comments[blog._id].slice(1, 10).map((comment, index) => (
                                                    <ListItem key={index}>
                                                        <Typography variant="body2">{comment}</Typography>
                                                    </ListItem>
                                                ))}
                                                {!comments[blog._id] && (
                                                    <ListItem>
                                                        <Typography variant="body2">No comments yet</Typography>
                                                    </ListItem>
                                                )}
                                            </List>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })
                ) : (
                    <Typography color="error">No blogs available</Typography>
                )}
            </Grid>

            <Pagination
                count={Math.ceil(blogs.length / blogsPerPage)}
                page={currentPage}
                onChange={(event, value) => setCurrentPage(value)}
                variant="outlined"
                shape="rounded"
                sx={{
                    marginTop: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    '& .MuiPagination-ul': {
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                    },
                    '& .MuiPagination-item': {
                        margin: '0 4px',
                        [theme.breakpoints.down('sm')]: {
                            margin: '4px 0',
                        },
                        [theme.breakpoints.down('xs')]: {
                            width: '100%',
                            textAlign: 'center',
                            margin: '4px 0',
                        },
                    },
                }}
            />

            <Dialog open={openCommentDialog} onClose={() => setOpenCommentDialog(false)} sx={{ '& .MuiDialog-paper': { padding: 2, borderRadius: 2 } }}>
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

export default AllBlogs;