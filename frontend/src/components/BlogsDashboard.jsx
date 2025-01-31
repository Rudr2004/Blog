import { useState, useEffect } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import MyBlogs from './MyBlogs';
import AllBlogs from './AllBlogs';
import { useDispatch } from 'react-redux';
import { fetchAllBlogsRequest } from '../redux/actions/blogAction';

const BlogsDashboard = () => {
    const [activeTab, setActiveTab] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch all blogs when the component mounts
        dispatch(fetchAllBlogsRequest({ page: 1, limit: 5 }));

    }, [dispatch]);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleBlogAdded = (newBlog) => {

        console.log('New blog added:', newBlog);
    };

    return (
        <Box sx={{ width: '80%', margin: '0 auto' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Blog Dashboard
            </Typography>
            <Tabs value={activeTab} onChange={handleTabChange} centered>
                <Tab label="All Blogs" />
                <Tab label="My Blogs" />
            </Tabs>
            <Box sx={{ mt: 2 }}>
                {activeTab === 0 ? <AllBlogs onBlogAdded={handleBlogAdded} /> : <MyBlogs />}
            </Box>
        </Box>
    );
};

export default BlogsDashboard;
